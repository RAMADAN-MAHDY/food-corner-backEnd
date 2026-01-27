import express from 'express';
import { check } from 'express-validator';
import { createReservation } from '../controllers/reservationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/reservation
// @desc    Create a new reservation
// @access  Private
router.post('/', protect, [
  check('name', 'Name is required').notEmpty(),
  check('phone', 'Phone number is required').notEmpty(),
  check('tables', 'Number of tables is required').isNumeric().isInt({ min: 1 }),
  check('people', 'Number of people is required').isNumeric().isInt({ min: 1 }),
  check('date', 'Date is required').isISO8601(),
  check('time', 'Time is required').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
], createReservation);

export default router;