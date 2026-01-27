import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js';

// @desc    Send contact message
// @route   POST /api/contact
// @access  Private
export const sendContactMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, message } = req.body;

  try {
    await Contact.create({
      name,
      email,
      phone,
      message
    });

    res.status(201).json({ message: 'تم إرسال الرسالة بنجاح' });
  } catch (error) {
    next(error);
  }
};