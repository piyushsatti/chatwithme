const app = require("./app");
const config = require("./config");
const connectDatabase = require("./config/database");

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Start Express server
    app.listen(config.port, () => {
      console.log(`
╔════════════════════════════════════════════╗
║         ChatWithMe API Server              ║
╠════════════════════════════════════════════╣
║  🚀 Server running on port ${config.port}             ║
║  📝 Environment: ${config.nodeEnv.padEnd(20)}║
║  🔗 http://localhost:${config.port}                  ║
╚════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

startServer();
