const express = require("express");
const router = express.Router();

const sessionRoutes = require("./session.routes");
const chatRoutes = require("./chat.routes");

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use("/session", sessionRoutes);
router.use("/chat", chatRoutes);

module.exports = router;
