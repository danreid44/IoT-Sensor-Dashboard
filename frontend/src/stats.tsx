const avgTemp = (sensors.reduce((acc, s) => acc + s.temperature, 0) / sensors.length).toFixed(1);
const maxVibration = Math.max(...sensors.map(s => s.vibration)).toFixed(1);
