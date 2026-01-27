import { validationResult } from 'express-validator';
import Subscription from '../models/Subscription.js';

// @desc    Subscribe to newsletter
// @route   POST /api/subscribe
// @access  Public
export const subscribe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const subscriptionExists = await Subscription.findOne({ email });

    if (subscriptionExists) {
      return res.status(400).json({ message: 'You are already subscribed' });
    }

    await Subscription.create({ email });

    res.status(201).json({ message: 'تم الاشتراك بنجاح' });
  } catch (error) {
    next(error);
  }
};