# Itinerary Builder Server

A robust backend server for managing travel itineraries, built with Node.js, Express, and MongoDB Atlas.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication system
- **MongoDB Atlas Integration**: Cloud-hosted database with optimized connection settings
- **Production-Ready Security**:
  - Rate limiting
  - XSS protection
  - NoSQL injection prevention
  - CORS configuration
  - Helmet security headers
- **Robust Error Handling**: Comprehensive error management and logging
- **Performance Optimizations**:
  - Response compression
  - Connection pooling
  - Query optimization
- **Health Monitoring**: Built-in health check endpoints
- **Logging System**: Winston-based logging with file and console outputs

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB Atlas account
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/branofy/ItineraryBuilder_Server.git
cd ItineraryBuilder_Server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=8800

# MongoDB Atlas
MONGO_URL=mongodb+srv://rajiv:gyvgiZo4pzUBlOP4@rajivdb.cw776ef.mongodb.net/ItineraryBuilder

# JWT
JWT_SECRET=jwt_secret
JWT_EXPIRES_IN=90d

# Security
ALLOWED_ORIGINS=http://localhost:8800,https://yourdomain.com
```

4. Create required directories:

```bash
mkdir logs
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## 📁 Project Structure

```
├── configs/             # Configuration files
│   └── database.js      # Database connection setup
├── models/             # Mongoose models
│   ├── Activity.js
│   ├── Booking.js
│   ├── DayPlan.js
│   ├── Destination.js
│   ├── Exclusion.js
│   ├── Inclusion.js
│   ├── Itinerary.js
│   ├── Review.js
│   ├── Transfer.js
│   ├── Traveller.js
│   └── User.js
├── logs/               # Log files
├── .env               # Environment variables
├── package.json       # Project dependencies
├── README.md         # Project documentation
└── server.js         # Application entry point
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Data Sanitization**: Protection against XSS and NoSQL injection
- **CORS**: Configurable allowed origins
- **Helmet**: Security headers configuration
- **Body Size Limits**: 10kb limit on request bodies

## 📊 API Endpoints

### Health Check

- `GET /health` - Server health status

### Base URL

- `GET /` - Welcome message

## 🔍 Monitoring

The application includes:

- Winston logging system
- MongoDB connection monitoring
- Request logging (Morgan)
- Error tracking
- Health check endpoints

## 🛠️ Development

### Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with hot reload
- `npm test` - Run tests

### Logging

Logs are stored in the `logs` directory:

- `db-error.log` - Database-specific errors
- `db-combined.log` - All database operations
- Console output in development mode

## 🔄 Database Connection

The application uses MongoDB Atlas with optimized connection settings:

- Connection pooling (min: 5, max: 10)
- Automatic reconnection
- Query timeout handling
- Graceful shutdown

## 🚨 Error Handling

- Operational errors with user-friendly messages
- Development mode with detailed error information
- Production mode with sanitized error responses
- Uncaught exception handling
- Unhandled rejection handling

## 📈 Performance

- Response compression
- Connection pooling
- Query optimization
- Index management
- Request timeout handling

## 🔐 Environment Variables

Required environment variables:

- `NODE_ENV`: Application environment (development/production)
- `PORT`: Server port
- `MONGO_URL`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret for JWT token generation
- `JWT_EXPIRES_IN`: JWT token expiration time
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Rajiv Suting - Initial work

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Express.js team for the web framework
- All contributors who have helped shape this project
