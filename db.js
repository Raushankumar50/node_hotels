// const mongoose = require('mongoose');

// // Define the MongoDB connection URL
// const mongoURL = 'mongodb://localhost:27017/hotels' // Replace 'hotels' with your database name

// // Set up MongoDB connectin
// mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// // Get the default connection
// // Mongoose maintains a default connection object representing the MongoDB connection.
// const db = mongoose.connection;

// // Define event listerners for database connection

// db.on('connection', () => {
//   console.log('Connected to MongoDB server');
// });

// db.on('error', (err) => {
//   console.error("MongoDB connection error:", err);
// });

// db.on('disconnected', () => {
//   console.log('MongoDB disconnected');
// });

// // Export the database connection
// module.exports = db;


















const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL; // Replace 'hotels' with your database name

// Set up MongoDB connection
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB server');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
