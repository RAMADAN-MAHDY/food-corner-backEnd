import { validationResult } from 'express-validator';
import Reservation from '../models/Reservation.js';

// @desc    Create a new reservation
// @route   POST /api/reservation
// @access  Private
export const createReservation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, phone, tables, people, date, time } = req.body;

  try {
    const reservation = await Reservation.create({
      name,
      phone,
      tables,
      people,
      date,
      time,
      userId: req.user._id
    });

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation: {
        id: reservation._id,
        name: reservation.name,
        phone: reservation.phone,
        tables: reservation.tables,
        people: reservation.people,
        date: reservation.date.toISOString().split('T')[0],
        time: reservation.time
      }
    });
  } catch (error) {
    next(error);
  }
};