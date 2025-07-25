const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes.js');
const tourDetailRoutes = require('./routes/tourDetailRoutes.js');
const exploreRoutes = require('./routes/exploreRoutes.js');
const accountRoutes = require('./routes/accountRoutes.js');
const ratingRoutes = require('./routes/ratingRoutes.js');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tour-details', tourDetailRoutes);
app.use('/api/explore', exploreRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/ratings', ratingRoutes);

app.use('/uploads', express.static('uploads'));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB Error:', err));
