require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/chatwithme",
  openaiApiKey: process.env.OPENAI_API_KEY,

  // Rate limiting configuration
  rateLimit: {
    minIntervalMs: 60 * 1000, // 1 minute between requests
    maxRequestsPerHour: 5, // 5 requests per hour
    windowMs: 60 * 60 * 1000, // 1 hour window
  },

  // Session configuration
  session: {
    ttlHours: 24, // Sessions expire after 24 hours
  },
};
