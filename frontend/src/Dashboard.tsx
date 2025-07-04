import React, { FunctionComponent, useState, useEffect } from "react"; // Import React and hooks
import axios from "axios"; // Import axios for HTTP requests
import Stats from "./Stats";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Import recharts components

// Define the structure of sensor data
interface SensorData {
  _id: string;
  name: string;
  temperature: number;
  vibration: number;
  timestamp: string;
} 

// Define the structure of the props for the Dashboard component
const Dashboard: FunctionComponent = () => {
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

// Calculate average temperature and maximum vibration from the sensor data
const avgTemp = sensors.length
  ? (sensors.reduce((sum, s) => sum + s.temperature, 0) / sensors.length).toFixed(1)
  : "N/A";

const maxVibration = sensors.length
  ? Math.max(...sensors.map((s) => s.vibration)).toFixed(1)
  : "N/A";


// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL is:", API_URL);

// Get sensor data from the API URL
 useEffect(() => {
  const controller = new AbortController(); // Create an AbortController to cancel the request if needed

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/sensors`, { signal: controller.signal }); // Fetch data from the API
      setSensors(res.data);
      setLoading(false);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        setError("Failed to fetch sensor data"); // Set error message if the request fails
        setLoading(false);
      }
    }
  };

  fetchData();
  const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

  return () => {
    clearInterval(interval);
    controller.abort(); // Cancels the request if unmounted
  };
}, [API_URL]); // Fetch data when the component mounts

// Custom tooltip for the charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#1a1a1a",
        color: "#f3f4f6", // Tailwind's text-gray-100
        border: "1px solid #333",
        borderRadius: "8px",
        padding: "12px",
        fontSize: "14px"
      }}>
        <p style={{ margin: 0, color: "#a5b4fc" }}>
          {new Date(label).toLocaleString()}
        </p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{ color: entry.color, margin: 0 }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Log the sensor data to the console
  if (loading) return <p className="text-center mt-10">Loading sensor data...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-800 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">Sensor Dashboard</h1>

        {/* Temperature Chart */}
        <div className="bg-gray-900 shadow-lg rounded-2xl p-6 mb-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">Temperature Over Time</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={sensors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                stroke="#f3f4f6" // Tailwind's text-gray-100
                tick={{ fill: "#f3f4f6" }}
              />
              <YAxis
                stroke="#f3f4f6" // Tailwind's text-gray-100
                tick={{ fill: "#f3f4f6" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#4f46e5" strokeWidth={2} name="Temperature (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vibration Chart */}
        <div className="bg-gray-900 shadow-lg rounded-2xl p-6 mb-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Vibration Over Time</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={sensors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                stroke="#f3f4f6" // Tailwind's text-gray-100
                tick={{ fill: "#f3f4f6" }} // Tick label color
              />
              <YAxis
                stroke="#f3f4f6" // Tailwind's text-gray-100
                tick={{ fill: "#f3f4f6" }} // Tick label color
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="vibration" stroke="#059669" strokeWidth={2} name="Vibration (mm/s)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <Stats avgTemp={avgTemp} maxVibration={maxVibration} />


      {/* Table */}
      <div className="bg-gray-900 shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-4">Sensor Data Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-100 rounded-lg">
            <thead>
              <tr className="bg-gray-900 text-gray-100 uppercase text-sm leading-normal">
                <th className="p-3 text-left">Sensor Name</th>
                <th className="p-3 text-left">Temperature (°C)</th>
                <th className="p-3 text-left">Vibration (mm/s)</th>
                <th className="p-3 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((sensor) => (
                <tr key={sensor._id} className="border-b hover:bg-gray-500">
                  <td className="p-2">{sensor.name}</td>
                  <td className="p-2">{sensor.temperature.toFixed(2)}</td>
                  <td className="p-2">{sensor.vibration.toFixed(2)}</td>
                  <td className="p-2">
                    {new Date(sensor.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; // Export the Dashboard component

