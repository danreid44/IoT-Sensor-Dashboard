import dotenv from 'dotenv'; // Load environment variables from .env
import mongoose from 'mongoose';
import Sensor from './models/sensor.js';  // Import the Sensor model

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    await Sensor.deleteMany(); // Clear existing data
    await Sensor.insertMany([
      { name: 'Motor A', temperature: 72.1, vibration: 123.97 },
      { name: 'Motor B', temperature: 76.5, vibration: 128.23 },
      { name: 'Motor C', temperature: 70.8, vibration: 122.16 },
    ]);
    console.log('Sample sensor data inserted');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
seedData();
