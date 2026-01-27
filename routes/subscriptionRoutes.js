import express from 'express';
import { check } from 'express-validator';
import { subscribe } from '../controllers/subscriptionController.js';

const router = express.Router();

// @route   POST /api/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail()
], subscribe);

export default router;