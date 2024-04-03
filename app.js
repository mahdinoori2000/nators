const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello, this comes from a server', app: 'Natours' });
});
app.post('/', (req, res) => {
  res.send('You can send request to this URL');
});

const port = '3000';
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
