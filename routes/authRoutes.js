import express from 'express';
import { check } from 'express-validator';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('password_confirmation', 'Password confirmation is required').notEmpty()
], register);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty()
], login);

export default router;
