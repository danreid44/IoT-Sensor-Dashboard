import mongoose from 'mongoose';

const SensorSchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  vibration: Number,
  timestamp: { type: Date, default: Date.now },
});

const Sensor = mongoose.model('Sensor', SensorSchema);

export default Sensor;
