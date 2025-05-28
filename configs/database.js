const mongoose = require("mongoose");
const winston = require("winston");

// Create logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/db-error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/db-combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// MongoDB connection options
const options = {
  autoIndex: process.env.NODE_ENV !== "production", // Don't build indexes in production
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  retryWrites: true,
  w: "majority",
  // New options for better performance and reliability
  minPoolSize: 5,
  maxIdleTimeMS: 60000,
  connectTimeoutMS: 10000,
  heartbeatFrequencyMS: 10000,
  maxConnecting: 3,
};

// Connection event handlers
const setupConnectionHandlers = () => {
  mongoose.connection.on("connected", () => {
    logger.info("MongoDB Atlas connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    logger.error("MongoDB Atlas connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB Atlas disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    logger.info("MongoDB Atlas reconnected");
  });

  // Handle application termination
  process.on("SIGINT", async () => {
    try {
      await mongoose.connection.close();
      logger.info("MongoDB Atlas connection closed through app termination");
      process.exit(0);
    } catch (err) {
      logger.error("Error during MongoDB Atlas disconnection:", err);
      process.exit(1);
    }
  });
};

// Initialize database connection
const connectDB = async () => {
  try {
    setupConnectionHandlers();

    const mongoURI = process.env.MONGO_URL;

    if (!mongoURI) {
      throw new Error(
        "MongoDB Atlas connection string is not defined in environment variables"
      );
    }

    await mongoose.connect(mongoURI, options);

    logger.info("MongoDB Atlas connected successfully");

    return mongoose.connection;
  } catch (error) {
    logger.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
};

// Graceful shutdown function
const gracefulShutdown = async () => {
  try {
    await mongoose.connection.close();
    logger.info("MongoDB Atlas connection closed through graceful shutdown");
  } catch (err) {
    logger.error("Error during graceful shutdown:", err);
    throw err;
  }
};

module.exports = {
  connectDB,
  gracefulShutdown,
  mongoose,
};
