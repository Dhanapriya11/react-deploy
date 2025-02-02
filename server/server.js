const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create an express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'https://virtual-try-on.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Handle MongoDB connection errors
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Define schemas
const dressSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
  offers: String,
  category: String
});

// Create models
const Casual = mongoose.model('Casual', dressSchema, 'casuals');
const PartyWear = mongoose.model('PartyWear', dressSchema, 'partywears');
const FormalWear = mongoose.model('FormalWear', dressSchema, 'formalwears');

// API endpoints
app.get('/api/casuals', async (req, res) => {
  try {
    const casuals = await Casual.find();
    res.json(casuals);
  } catch (err) {
    console.error('Error fetching casuals:', err);
    res.status(500).json({ error: 'Error fetching casual wear data' });
  }
});

app.get('/api/partywears', async (req, res) => {
  try {
    const partywears = await PartyWear.find();
    res.json(partywears);
  } catch (err) {
    console.error('Error fetching partywears:', err);
    res.status(500).json({ error: 'Error fetching party wear data' });
  }
});

app.get('/api/formalwears', async (req, res) => {
  try {
    const formalwears = await FormalWear.find();
    res.json(formalwears);
  } catch (err) {
    console.error('Error fetching formalwears:', err);
    res.status(500).json({ error: 'Error fetching formal wear data' });
  }
});

// Get dress by ID (for any category)
app.get('/api/dresses/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let dress = await Casual.findById(id);
    if (!dress) {
      dress = await PartyWear.findById(id);
    }
    if (!dress) {
      dress = await FormalWear.findById(id);
    }
    if (!dress) {
      return res.status(404).json({ error: 'Dress not found' });
    }
    res.json(dress);
  } catch (err) {
    console.error('Error fetching dress:', err);
    res.status(500).json({ error: 'Error fetching dress data' });
  }
});

// Add a new dress
app.post('/api/dresses', async (req, res) => {
  try {
    const { category, ...dressData } = req.body;
    let dress;
    
    switch (category.toLowerCase()) {
      case 'casual':
        dress = new Casual(dressData);
        break;
      case 'party':
        dress = new PartyWear(dressData);
        break;
      case 'formal':
        dress = new FormalWear(dressData);
        break;
      default:
        return res.status(400).json({ error: 'Invalid category' });
    }
    
    await dress.save();
    res.status(201).json(dress);
  } catch (err) {
    console.error('Error adding dress:', err);
    res.status(500).json({ error: 'Error adding dress' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
