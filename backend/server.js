import dotenv from 'dotenv'; // Load environment variables from .env

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Sensor from './models/sensor.js';

dotenv.config();

const app = express();

const mongoURI = process.env.MONGO_URI;  // Get from .env file

// Middleware
app.use(express.json()); // Allows JSON requests
app.use(cors()); // Enables cross-origin requests

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));


// Define Mongoose Schema and Model
const SensorSchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  vibration: Number,
  timestamp: { type: Date, default: Date.now },
});


// API Route to Fetch Sensor Data
app.get('/sensors', async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define Port and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

