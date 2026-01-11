const config = require("../config");
const { generateToken } = require("../utils/tokenGenerator");

// In-memory session store (cached globally for serverless)
if (!global.__sessionStore) {
  global.__sessionStore = new Map();
}
const sessionStore = global.__sessionStore;

class Session {
  constructor(data = {}) {
    this.sessionToken = data.sessionToken || generateToken();
    this.messages = data.messages || [];
    this.llmRequestTimestamps = data.llmRequestTimestamps || [];
    this.createdAt = data.createdAt || new Date();
    this.metadata = data.metadata || {};
  }

  // Check rate limits
  checkRateLimit() {
    const now = new Date();
    const oneMinuteAgo = new Date(
      now.getTime() - config.rateLimit.minIntervalMs
    );
    const oneHourAgo = new Date(now.getTime() - config.rateLimit.windowMs);

    // Clean up old timestamps (older than 1 hour)
    this.llmRequestTimestamps = this.llmRequestTimestamps.filter(
      (ts) => ts > oneHourAgo
    );

    // Check minimum interval (1 minute)
    const lastRequest =
      this.llmRequestTimestamps[this.llmRequestTimestamps.length - 1];
    if (lastRequest && lastRequest > oneMinuteAgo) {
      const waitTime = Math.ceil(
        (lastRequest.getTime() +
          config.rateLimit.minIntervalMs -
          now.getTime()) /
          1000
      );
      return {
        allowed: false,
        reason: "RATE_LIMIT_MINUTE",
        message: `Please wait ${waitTime} seconds before making another request`,
        retryAfter: waitTime,
      };
    }

    // Check hourly limit (5 requests per hour)
    const requestsInLastHour = this.llmRequestTimestamps.filter(
      (ts) => ts > oneHourAgo
    ).length;
    if (requestsInLastHour >= config.rateLimit.maxRequestsPerHour) {
      const oldestInWindow = this.llmRequestTimestamps.find(
        (ts) => ts > oneHourAgo
      );
      const waitTime = Math.ceil(
        (oldestInWindow.getTime() + config.rateLimit.windowMs - now.getTime()) /
          1000
      );
      return {
        allowed: false,
        reason: "RATE_LIMIT_HOUR",
        message: `Hourly limit of ${config.rateLimit.maxRequestsPerHour} requests exceeded. Please try again later`,
        retryAfter: waitTime,
      };
    }

    return { allowed: true };
  }

  // Record a new LLM request
  recordLLMRequest() {
    this.llmRequestTimestamps.push(new Date());
  }

  // Add a message to the conversation
  addMessage(role, content) {
    this.messages.push({ role, content, timestamp: new Date() });
  }

  // Save session to store
  save() {
    sessionStore.set(this.sessionToken, this);
    return Promise.resolve(this);
  }

  // Static: Find session by token
  static findOne({ sessionToken }) {
    const session = sessionStore.get(sessionToken);
    return Promise.resolve(session || null);
  }

  // Static: Create new session
  static create(data) {
    const session = new Session(data);
    sessionStore.set(session.sessionToken, session);
    return Promise.resolve(session);
  }

  // Cleanup expired sessions
  static cleanupExpired() {
    const now = new Date();
    const ttlMs = config.session.ttlHours * 60 * 60 * 1000;
    for (const [token, session] of sessionStore.entries()) {
      if (now - session.createdAt > ttlMs) {
        sessionStore.delete(token);
      }
    }
  }
}

module.exports = Session;
