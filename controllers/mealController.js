import Meal from '../models/Meal.js';

// @desc    Get all meals
// @route   GET /api/meals
// @access  Public
export const getMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find();

    res.json({
      data: meals.map(meal => ({
        id: meal._id,
        name: meal.name,
        price: meal.price
      }))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get meals by category
// @route   GET /api/categories/:categoryId/meals
// @access  Public
export const getMealsByCategory = async (req, res, next) => {
  try {
    const meals = await Meal.find({ category: req.params.categoryId });

    res.json({
      meals: meals.map(meal => ({
        id: meal._id,
        name: meal.name,
        price: meal.price
      }))
    });
  } catch (error) {
    next(error);
  }
};