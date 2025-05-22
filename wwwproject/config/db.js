const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blog-api-test');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn; // Return the connection
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error; // Throw instead of process.exit()
  }
};

module.exports = connectDB;