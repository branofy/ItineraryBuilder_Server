const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const { connectDB, gracefulShutdown } = require("./configs/database");
require("dotenv").config();

// Initialize express app
const app = express();

// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10kb" })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      skip: (req, res) => res.statusCode < 400, // Only log errors in production
    })
  );
}

// Request logging middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Basic route for testing
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to Itinerary Builder API",
    timestamp: req.requestTime,
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
    timestamp: req.requestTime,
    uptime: process.uptime(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production error response
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Programming or unknown errors
      console.error("ERROR 💥", err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Start server function
const startServer = async () => {
  try {
    // Connect to MongoDB Atlas
    await connectDB();
    console.log("✅ Database connected successfully");

    // Start Express server
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔒 Security features enabled`);
    });

    // Handle server errors
    server.on("error", (error) => {
      console.error("Server error:", error);
      gracefulShutdown();
    });

    // Handle server timeout
    server.timeout = 120000; // 2 minutes
    server.keepAliveTimeout = 65000; // 65 seconds
    server.headersTimeout = 66000; // 66 seconds
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
const shutdown = async () => {
  console.log("🛑 Shutting down server...");
  try {
    await gracefulShutdown();
    console.log("✅ Server shutdown complete");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

// Handle termination signals
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  shutdown();
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  shutdown();
});

// Start the server
startServer();
