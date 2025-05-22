const express = require('express');
const connectDB = require('./config/db');
// const seedDatabase = require('./config/seed'); // Optional: Import seeder
const cors = require('cors');
const errorHandler = require('./middlewares/error');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

// Export the app for testing
module.exports = app;

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}