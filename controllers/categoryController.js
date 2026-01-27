import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.json({
      data: categories.map(category => ({
        id: category._id,
        name: category.name
      }))
    });
  } catch (error) {
    next(error);
  }
};