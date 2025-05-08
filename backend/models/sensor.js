import mongoose from 'mongoose'; // MongoDB connection

// Define the schema for sensor data in the database
const SensorSchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  vibration: Number,
  timestamp: { type: Date, default: Date.now },
}); 

// Create a model based on the schema
const Sensor = mongoose.model('Sensor', SensorSchema); 

export default Sensor; // Export the model as Sensor for use in other files
