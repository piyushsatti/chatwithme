const mongoose = require("mongoose");
const config = require("./index");

// Cache connection for serverless environments (Vercel)
let cached = global.__mongoose;

if (!cached) {
  cached = global.__mongoose = { conn: null, promise: null };
}

const connectDatabase = async () => {
  // If already connected, return existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // If connection is in progress, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 10000, // Socket timeout 10s
    };

    cached.promise = mongoose
      .connect(config.mongodbUri, opts)
      .then((mongoose) => {
        console.log("✅ Connected to MongoDB");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }

  return cached.conn;
};

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
  cached.conn = null;
  cached.promise = null;
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err);
});

module.exports = connectDatabase;
