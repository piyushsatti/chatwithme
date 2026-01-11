const mongoose = require("mongoose");
const config = require("../config");

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema({
  sessionToken: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  messages: {
    type: [messageSchema],
    default: [],
  },
  llmRequestTimestamps: {
    type: [Date],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: config.session.ttlHours * 60 * 60, // TTL in seconds (24 hours)
  },
  metadata: {
    ip: String,
    userAgent: String,
  },
});

// Method to check rate limits
sessionSchema.methods.checkRateLimit = function () {
  const now = new Date();
  const oneMinuteAgo = new Date(now.getTime() - config.rateLimit.minIntervalMs);
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
      (lastRequest.getTime() + config.rateLimit.minIntervalMs - now.getTime()) /
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
};

// Method to record a new LLM request
sessionSchema.methods.recordLLMRequest = function () {
  this.llmRequestTimestamps.push(new Date());
};

// Method to add a message to the conversation
sessionSchema.methods.addMessage = function (role, content) {
  this.messages.push({ role, content, timestamp: new Date() });
};

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
