import React, { FunctionComponent, useState, useEffect } from "react"; // Import React and hooks
import axios from "axios"; // Import axios for HTTP requests
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

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL is:", API_URL);

// Get sensor data from the API URL
  useEffect(() => {
    axios
      .get(`${API_URL}/sensors`)
      .then((response) => {
        setSensors(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err); // Log the error to the console
        setError("Failed to fetch sensor data");
        setLoading(false);
      });
  }, [API_URL]);
  
// Log the sensor data to the console
  if (loading) return <p className="text-center mt-10">Loading sensor data...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Sensor Dashboard</h1>

        {/* Temperature Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">Temperature Over Time</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={sensors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#4f46e5" strokeWidth={2} name="Temperature (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vibration Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Vibration Over Time</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={sensors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="vibration" stroke="#059669" strokeWidth={2} name="Vibration (Hz)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-4">Sensor Data Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-indigo-100 text-indigo-1000 uppercase text-sm leading-normal">
                <th className="p-3 text-left">Sensor Name</th>
                <th className="p-3 text-left">Temperature (°C)</th>
                <th className="p-3 text-left">Vibration (Hz)</th>
                <th className="p-3 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((sensor) => (
                <tr key={sensor._id} className="border-b hover:bg-gray-50">
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

