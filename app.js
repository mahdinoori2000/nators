const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello, this comes from a server', app: 'Natours' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tours: newTour } });
    }
  );
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ message: 'success', result: tours.length, tours });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id > tours.length) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res
    .status(200)
    .json({ status: 'success', data: '<Tour Updated successfully' });
});
const port = '3000';
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
