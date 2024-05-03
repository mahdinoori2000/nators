const fs = require('fs');

const Tour = require('../models/tourModel');

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      message: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Invalid tour send' });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1)NORMAL FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // const query = Tour.find()
    // .where('duration')
    // .equals(5)
    // .where('difficulty')
    // .equals('easy');

    // 2)ADVANED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Tour.find(JSON.parse(queryStr));
    const tours = await query;

    // const tours = await Tour.find();
    res.status(200).json({ message: 'success', result: tours.length, tours });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      stutas: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      ranValidator: true,
    });
    res.status(200).json({ status: 'success', tour });
  } catch (err) {
    res.status(404).json({ status: 'fails', message: err });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({ status: 'success', message: 'The tour deleted successfully' });
  } catch (err) {
    res.status(404).json({ status: 'fails', message: err });
  }
};
