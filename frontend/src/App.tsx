import React from "react";
import './App.css';
import Dashboard from "./Dashboard.tsx"; // Ensure this file exists

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Dashboard />
    </div>
  );
}

export default App;