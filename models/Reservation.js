import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please enter your phone number'],
    trim: true
  },
  tables: {
    type: Number,
    required: [true, 'Please enter the number of tables'],
    min: [1, 'Number of tables must be at least 1']
  },
  people: {
    type: Number,
    required: [true, 'Please enter the number of people'],
    min: [1, 'Number of people must be at least 1']
  },
  date: {
    type: Date,
    required: [true, 'Please enter the reservation date']
  },
  time: {
    type: String,
    required: [true, 'Please enter the reservation time']
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Reservation', ReservationSchema);