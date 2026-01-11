const Session = require("../models/Session");

/**
 * Rate limiter middleware for LLM requests
 * Checks session-based rate limits: 1 request/minute and 5 requests/hour
 */
const rateLimiter = async (req, res, next) => {
  try {
    const { sessionToken } = req.body;

    if (!sessionToken) {
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Session token is required",
      });
    }

    const session = await Session.findOne({ sessionToken });

    if (!session) {
      return res.status(404).json({
        error: "SESSION_NOT_FOUND",
        message:
          "Invalid or expired session token. Please create a new session.",
      });
    }

    // Check rate limits
    const rateLimitCheck = session.checkRateLimit();

    if (!rateLimitCheck.allowed) {
      return res.status(429).json({
        error: rateLimitCheck.reason,
        message: rateLimitCheck.message,
        retryAfter: rateLimitCheck.retryAfter,
      });
    }

    // Attach session to request for use in controller
    req.session = session;
    next();
  } catch (error) {
    console.error("❌ Rate limiter error:", error.message);
    return res.status(500).json({
      error: "INTERNAL_ERROR",
      message: "An error occurred while checking rate limits",
    });
  }
};

module.exports = rateLimiter;
