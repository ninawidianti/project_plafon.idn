const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Import routes
const userRoutes = require('./routes/userRoutes');
const cafeRoutes = require('./routes/cafeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/cafes', cafeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlists', wishlistRoutes);

// Root
app.get('/', (req, res) => {
  res.send('API Web Cafe is running...');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


