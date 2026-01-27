import express from 'express';
import { check } from 'express-validator';
import { sendContactMessage } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Send contact message
// @access  Private
router.post('/', protect, [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('phone', 'Phone number is required').notEmpty(),
  check('message', 'Message is required').notEmpty()
], sendContactMessage);

export default router;