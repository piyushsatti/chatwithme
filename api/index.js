// Direct Vercel handler - no serverless-http
const Session = require("../src/models/Session");
const llmService = require("../src/services/llm.service");
const { generateToken } = require("../src/utils/tokenGenerator");

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  const url = req.url.split("?")[0];
  const respond = (status, data) => {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };

  try {
    // Health check
    if (url === "/api/health" || url === "/health") {
      return respond(200, { status: "ok", timestamp: new Date().toISOString() });
    }

    // Root
    if (url === "/" || url === "/api") {
      return respond(200, {
        name: "ChatWithMe API",
        version: "1.0.0",
        endpoints: { health: "/api/health", session: "/api/session", chat: "/api/chat" }
      });
    }

    // Create session
    if (url === "/api/session" && req.method === "POST") {
      const session = await Session.create({
        sessionToken: generateToken(),
        metadata: { ip: req.headers["x-forwarded-for"] || "unknown" }
      });
      return respond(201, { sessionToken: session.sessionToken, expiresIn: "24 hours" });
    }

    // Chat
    if (url === "/api/chat" && req.method === "POST") {
      let body = "";
      for await (const chunk of req) body += chunk;
      const { sessionToken, question } = JSON.parse(body);

      if (!sessionToken) return respond(400, { error: "sessionToken required" });
      if (!question) return respond(400, { error: "question required" });

      const session = await Session.findOne({ sessionToken });
      if (!session) return respond(404, { error: "Session not found" });

      const rateCheck = session.checkRateLimit();
      if (!rateCheck.allowed) return respond(429, rateCheck);

      const answer = await llmService.generateResponse(session.messages.slice(-10), question);
      session.recordLLMRequest();
      session.addMessage("user", question);
      session.addMessage("assistant", answer);
      await session.save();

      return respond(200, { answer });
    }

    return respond(404, { error: "Not found" });
  } catch (error) {
    return respond(500, { error: error.message });
  }
};
