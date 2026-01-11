const Session = require("../models/Session");
const { generateToken } = require("../utils/tokenGenerator");

/**
 * Create a new chat session
 * POST /api/session
 */
const createSession = async (req, res) => {
  try {
    const sessionToken = generateToken();

    const session = new Session({
      sessionToken,
      metadata: {
        ip: req.ip,
        userAgent: req.get("user-agent"),
      },
    });

    await session.save();

    console.log(`✅ New session created: ${sessionToken}`);

    res.status(201).json({
      sessionToken,
      message: "Session created successfully",
      expiresIn: "24 hours",
    });
  } catch (error) {
    console.error("❌ Error creating session:", error.message);
    res.status(500).json({
      error: "SESSION_CREATE_ERROR",
      message: "Failed to create session",
    });
  }
};

/**
 * Get session info (optional - for debugging/frontend status)
 * GET /api/session/:token
 */
const getSession = async (req, res) => {
  try {
    const { token } = req.params;

    const session = await Session.findOne({ sessionToken: token });

    if (!session) {
      return res.status(404).json({
        error: "SESSION_NOT_FOUND",
        message: "Invalid or expired session token",
      });
    }

    // Calculate remaining rate limit info
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const requestsInLastHour = session.llmRequestTimestamps.filter(
      (ts) => ts > oneHourAgo
    ).length;

    res.json({
      sessionToken: session.sessionToken,
      messageCount: session.messages.length,
      createdAt: session.createdAt,
      rateLimit: {
        requestsUsed: requestsInLastHour,
        requestsRemaining: Math.max(0, 5 - requestsInLastHour),
        maxRequestsPerHour: 5,
      },
    });
  } catch (error) {
    console.error("❌ Error getting session:", error.message);
    res.status(500).json({
      error: "SESSION_GET_ERROR",
      message: "Failed to get session info",
    });
  }
};

module.exports = {
  createSession,
  getSession,
};
