import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import mealRoutes from './routes/mealRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Load env variables
dotenv.config();

// Create express app
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
const corsOptions = {

    origin: ["https://food-corner-roan.vercel.app" , "http://localhost:3000"],
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => {
  console.error('MongoDB Connection Error:', err.message);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/subscribe', subscriptionRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});