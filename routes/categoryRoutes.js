import express from 'express';
import { getCategories } from '../controllers/categoryController.js';
import { getMealsByCategory } from '../controllers/mealController.js';

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getCategories);

// @route   GET /api/categories/:categoryId/meals
// @desc    Get meals by category
// @access  Public
router.get('/:categoryId/meals', getMealsByCategory);

export default router;