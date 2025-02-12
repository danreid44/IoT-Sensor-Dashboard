# IoT Sensor Dashboard

This is a full-stack IoT sensor dashboard that collects, stores, and displays temperature and vibration sensor data using **MongoDB, Express, React, Node.js (MERN)** with **Recharts** for data visualization and **TailwindCSS** for styling.

## Features

- **Real-time IoT Sensor Data** – Fetches sensor data from MongoDB
- **Interactive Charts** – Uses Recharts to display sensor trends
- **REST API** – Backend built with Node.js & Express
- **Modern UI** – Frontend built with React, TypeScript, and TailwindCSS
- **Modular Codebase** – Backend and Frontend in separate directories

## Project Structure
/my-project
│── /backend
│   ├── server.js  # Main server file
│   ├── seed.js  # Script to populate MongoDB with sample data
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│── /frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── Dashboard.tsx   # UI with Recharts
│   ├── public/
│   ├── tailwind.config.js
│   ├── package.json
│── .gitignore
│── README.md

---

## Installation & Setup

### 1. Clone the Repository
git clone https://github.com/yourusername/iot-sensor-dashboard.git
cd iot-sensor-dashboard

### 2️. Set Up the Backend
cd backend
npm install  # Install dependencies
cp .env.example .env  # Configure your MongoDB URI in .env
node seed.js  # Populate database with sample data
npm start  # Start backend server at http://localhost:5000

### 3. Set Up the Frontend
cd frontend
npm install  # Install dependencies
npm start  # Start frontend server at http://localhost:3000

---

## 🌐 API Endpoints

| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| GET    | /api/sensors   | Fetch all sensor data |

---
# IoT-Sensor-Dashboard
