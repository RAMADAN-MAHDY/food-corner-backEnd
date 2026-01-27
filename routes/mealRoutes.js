import express from 'express';
import { getMeals } from '../controllers/mealController.js';

const router = express.Router();

// @route   GET /api/meals
// @desc    Get all meals
// @access  Public
router.get('/', getMeals);

export default router;