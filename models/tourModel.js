const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour should have a name'],
    unique: true,
    trim: true,
  },
  durations: {
    type: Number,
    required: [true, 'Tour should have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Tour should have a price'],
  },
  priceDiscount: Number,
  summery: {
    type: String,
    trim: true,
    required: [true, 'A tour must have description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a car image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
