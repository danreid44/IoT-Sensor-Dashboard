# IoT Sensor Dashboard

This is a full-stack IoT sensor dashboard that collects, stores, and displays temperature and vibration sensor data using the **MongoDB, Express, React, Node.js (MERN)** stack. This is designed to be a scalable dashboard that supports a sensor data in a variety of applications.

# Key Features

- Backend built with Node.js and Express
- Uses MongoDB as the database for the sensor data
- Frontend is built with React, TypeScript, and TailwindCSS
- Postman collection for testing the API endpoints


# Installation Instructions

# 1. Clone the Repository
git clone https://github.com/yourusername/iot-sensor-dashboard.git
cd iot-sensor-dashboard

# 2️. Set Up the Backend
cd backend
npm install  # Install dependencies
cp .env.example .env  # Configure your MongoDB URI in .env
node seed.js  # Populate database with sample data
npm run start:5000 (or npm run start:5001) # Start backend server at http://localhost:5000/sensors

# 3. Set Up the Frontend
cd frontend
npm install  # Install dependencies
npm run dev # Run frontend server at http://localhost:5173


# API Endpoints

GET     `/sensors`      # Get all sensor data
POST    `/sensors`      # Add new sensor data
PATCH   `/sensors/:id`  # Update a sensor record
DELETE  `/sensors/:id`  # Delete sensor record

