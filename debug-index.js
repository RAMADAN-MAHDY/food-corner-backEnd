// Debug version of index.js to find the error
import dotenv from 'dotenv';
console.log('Loading dotenv...');
dotenv.config();
console.log('dotenv loaded. PORT:', process.env.PORT || 5000);

import express from 'express';
console.log('Express imported');

import mongoose from 'mongoose';
console.log('Mongoose imported');

import cors from 'cors';
console.log('CORS imported');

console.log('Importing routes...');
import authRoutes from './routes/authRoutes.js';
console.log('Auth routes imported');

import reservationRoutes from './routes/reservationRoutes.js';
console.log('Reservation routes imported');

import categoryRoutes from './routes/categoryRoutes.js';
console.log('Category routes imported');

import mealRoutes from './routes/mealRoutes.js';
console.log('Meal routes imported');

import subscriptionRoutes from './routes/subscriptionRoutes.js';
console.log('Subscription routes imported');

import contactRoutes from './routes/contactRoutes.js';
console.log('Contact routes imported');

// Create express app
console.log('Creating express app...');
const app = express();
console.log('Express app created');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log('Body parser middleware added');

// CORS middleware
app.use(cors());
console.log('CORS middleware added');

// Connect to MongoDB
console.log('Connecting to MongoDB...');
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB Connected');
  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/reservation', reservationRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/meals', mealRoutes);
  app.use('/api/subscribe', subscriptionRoutes);
  app.use('/api/contact', contactRoutes);
  console.log('Routes added');
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
  });
  console.log('Error handling middleware added');
  
  // Set port
  const PORT = process.env.PORT || 5000;
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB Connection Error:', err.message);
  console.error('Full error:', err);
  process.exit(1);
});