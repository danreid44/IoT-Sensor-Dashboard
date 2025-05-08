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

// Run the seedData function to insert sample data
// Define Schema and Model for the sensor data in MongoDB
const seedData = async () => {
  try {
    await Sensor.deleteMany(); // Clear existing data
    await Sensor.insertMany([
      { name: 'Motor A', temperature: 72.1, vibration: 123.97 },
      { name: 'Motor B', temperature: 76.5, vibration: 128.23 },
      { name: 'Motor C', temperature: 70.8, vibration: 122.16 },
      { name: 'Motor D', temperature: 75.4, vibration: 126.82 },
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
