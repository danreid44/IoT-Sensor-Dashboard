import React from "react";

interface StatsProps {
  avgTemp: string;
  maxVibration: string;
}

const Stats: React.FC<StatsProps> = ({ avgTemp, maxVibration }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-800 text-white p-4 rounded-xl shadow">
        <h3 className="text-sm text-gray-400">Avg Temperature</h3>
        <p className="text-2xl font-bold">{avgTemp} °C</p>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-xl shadow">
        <h3 className="text-sm text-gray-400">Max Vibration</h3>
        <p className="text-2xl font-bold">{maxVibration} mm/s</p>
      </div>
    </div>
  );
};

export default Stats;
