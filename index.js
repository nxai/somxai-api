const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const attractions = require('./attractions.json');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/attractions', (req, res) => {
  res.json(attractions);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;