const fs = require('fs');

const Tour = require('../models/tourModel');

// exports.checkId = (req, res, next, val) => {
//   // if (val > tours.length) {
//   //   return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
//   // }
//   // next();
// };

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

exports.getAllTours = (req, res) => {
  // res.status(200).json({ message: 'success', result: tours.length, tours });
};

exports.getTour = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id == id);
  // if (!tour) {
  //   res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  // }
  // res.status(200).json({
  //   stutas: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: '<Tour Updated successfully' });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
