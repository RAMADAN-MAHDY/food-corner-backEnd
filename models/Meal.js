import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter meal name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please enter meal price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Meal', MealSchema);