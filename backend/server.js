// backend/server.js
const Idea = require('./models/idea');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Test route
app.get('/', (req, res) => {
  res.send('mankind backend running!');
});


// Route to submit a new idea
app.post('/api/ideas', async (req, res) => {
  try {
    const { text } = req.body;
    const idea = new Idea({ text });
    await idea.save();
    res.json({ message: 'Idea saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving idea.' });
  }
});

// Route to fetch all ideas
app.get('/api/ideas', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching ideas.' });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

