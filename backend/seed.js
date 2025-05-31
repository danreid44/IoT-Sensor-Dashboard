import dotenv from 'dotenv'; // Load environment variables from .env
import mongoose from 'mongoose'; // MongoDB connection
import Sensor from './models/sensor.js';  // Import the Sensor model to define data structure

dotenv.config(); // Load environment variables from .env file

/* Connect to MongoDB using the URI from .env file
Ensure compatibility with the latest MongoDB drivers */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Clear existing sensor data before seeding new data
await Sensor.deleteMany({}); 
console.log('Cleared all existing sensor data');

// Run the seedData function to insert sample data
// Define Schema and Model for the sensor data in MongoDB
const seedData = async () => {
  try {
    await Sensor.deleteMany(); // Clear existing data
    await Sensor.insertMany([
      { name: 'Motor 01', temperature: 22.4, vibration: 2.95 },
      { name: 'Motor 02', temperature: 29.5, vibration: 5.67 },
      { name: 'Motor 03', temperature: 23.6, vibration: 3.18 },
      { name: 'Motor 04', temperature: 27.3, vibration: 4.29 },
    ]); // Insert sample data for 60 Hz AC motors
    console.log('Sample sensor data inserted'); // Log success message
  } catch (error) {
    console.error('Error inserting sample data:', error); // Log error message
  } finally {
    mongoose.connection.close(); // Close the connection to MongoDB
  }
};

// Run the script to seed the database
seedData();
