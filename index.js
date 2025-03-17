const express = require('express');
const app = express();
const attractions = require('./attractions.json');

app.use(express.json());

// GET all attractions
app.get('/api/attractions', (req, res) => {
  res.json(attractions);
});

// GET a single attraction by ID
app.get('/api/attractions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const attraction = attractions.find(a => a.id === id);
  if (attraction) {
    res.json(attraction);
  } else {
    res.status(404).json({ message: 'Attraction not found' });
  }
});

// POST a new attraction
app.post('/api/attractions', (req, res) => {
  const newAttraction = req.body;
  newAttraction.id = attractions.length + 1; // Simple ID generation
  attractions.push(newAttraction);
  res.status(201).json(newAttraction);
});

// PUT (update) an attraction by ID
app.put('/api/attractions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedAttraction = req.body;
  const index = attractions.findIndex(a => a.id === id);
  if (index !== -1) {
    attractions[index] = { ...attractions[index], ...updatedAttraction };
    res.json(attractions[index]);
  } else {
    res.status(404).json({ message: 'Attraction not found' });
  }
});

// DELETE an attraction by ID
app.delete('/api/attractions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = attractions.findIndex(a => a.id === id);
  if (index !== -1) {
    attractions.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Attraction not found' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;