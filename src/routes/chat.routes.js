const express = require("express");
const router = express.Router();
const { chat, getHistory } = require("../controllers/chat.controller");
const rateLimiter = require("../middleware/rateLimiter");

// Chat endpoint - requires session token and applies rate limiting
router.post("/", rateLimiter, chat);

// Get chat history - uses a simple session validation
router.get(
  "/history",
  async (req, res, next) => {
    const Session = require("../models/Session");
    const { sessionToken } = req.query;

    if (!sessionToken) {
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Session token is required as query parameter",
      });
    }

    const session = await Session.findOne({ sessionToken });
    if (!session) {
      return res.status(404).json({
        error: "SESSION_NOT_FOUND",
        message: "Invalid or expired session token",
      });
    }

    req.session = session;
    next();
  },
  getHistory
);

module.exports = router;
