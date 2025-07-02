import dotenv from 'dotenv'; // Load environment variables from .env

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Sensor from './models/sensor.js';

dotenv.config();

const app = express(); // Create an Express application

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
  timestamp: { type: Date, default: Date.now }, // Automatically set timestamp
});


// API Route to Get Sensor Data
app.get('/sensors', async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Route to Post Sensor Data
app.post('/sensors', async (req, res) => {
  try{
    const newSensor = new Sensor(req.body);
    await newSensor.save();
    res.status(201).json({ message: 'Sensor data saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Route to Patch Sensor Data
app.patch('/sensors/:id', async (req, res) => {
  const updatedSensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedSensor) {
    return res.status(404).json({ error: 'Sensor not found' });
  }
  res.send(updatedSensor);
});


// API Route to Delete Sensor Data
app.delete('/sensors/:id', async (req, res) => {
  const deletedSensor = await Sensor.findByIdAndDelete(req.params.id);
  if (!deletedSensor) {
    return res.status(404).json({ error: 'Sensor not found' });
  }
  res.send({ message: 'Sensor deleted' });
});

// Define Port and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

