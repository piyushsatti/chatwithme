const llmService = require("../services/llm.service");

/**
 * Handle chat message
 * POST /api/chat
 */
const chat = async (req, res) => {
  try {
    const { question } = req.body;
    const session = req.session; // Attached by rateLimiter middleware

    if (
      !question ||
      typeof question !== "string" ||
      question.trim().length === 0
    ) {
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Question is required and must be a non-empty string",
      });
    }

    const trimmedQuestion = question.trim();

    // Check question length
    if (trimmedQuestion.length > 2000) {
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Question must be less than 2000 characters",
      });
    }

    // Get conversation history (limit to last 10 messages for context)
    const conversationHistory = session.messages.slice(-10);

    // Generate response from LLM
    const answer = await llmService.generateResponse(
      conversationHistory,
      trimmedQuestion
    );

    // Record the LLM request for rate limiting
    session.recordLLMRequest();

    // Add messages to session
    session.addMessage("user", trimmedQuestion);
    session.addMessage("assistant", answer);

    // Save session
    await session.save();

    console.log(
      `💬 Chat response generated for session: ${session.sessionToken}`
    );

    res.json({
      answer,
      messageCount: session.messages.length,
    });
  } catch (error) {
    console.error("❌ Chat error:", error.message);
    res.status(500).json({
      error: "CHAT_ERROR",
      message: error.message || "Failed to generate response",
    });
  }
};

/**
 * Get chat history for a session
 * GET /api/chat/history
 */
const getHistory = async (req, res) => {
  try {
    const session = req.session;

    res.json({
      messages: session.messages,
      messageCount: session.messages.length,
    });
  } catch (error) {
    console.error("❌ Get history error:", error.message);
    res.status(500).json({
      error: "HISTORY_ERROR",
      message: "Failed to get chat history",
    });
  }
};

module.exports = {
  chat,
  getHistory,
};
