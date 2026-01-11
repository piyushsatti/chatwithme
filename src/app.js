const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();

// Security middleware
app.use(helmet());

// CORS - configure for your frontend origin in production
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Request logging
app.use(morgan("dev"));

// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Trust proxy (for accurate IP in rate limiting behind reverse proxy)
app.set("trust proxy", 1);

// API routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    name: "ChatWithMe API",
    version: "1.0.0",
    description: "A LLM chat application for Q&A about my profile",
    endpoints: {
      health: "GET /api/health",
      createSession: "POST /api/session",
      getSession: "GET /api/session/:token",
      chat: "POST /api/chat",
      chatHistory: "GET /api/chat/history?sessionToken=xxx",
    },
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
