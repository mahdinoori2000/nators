const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.difficulty || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid input of difficulty or price',
    });
  }
  next();
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tours: newTour } });
    }
  );
};

exports.getAllTours = (req, res) => {
  res.status(200).json({ message: 'success', result: tours.length, tours });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id == id);

  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(200).json({
    stutas: 'success',
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: '<Tour Updated successfully' });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
