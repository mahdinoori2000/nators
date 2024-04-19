const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour should have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  price: {
    type: Number,
    required: [true, 'Tour should have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('Database connected succesfully!');
  });

const port = '3000';
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
