const mongoose = require('mongoose');

const busStopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    city: String,
    latitude: Number,
    longitude: Number,
  },
  routes: [String], // Bus routes stopping here
  facilities: [String], // E.g., Shelter, Bench
});

module.exports = mongoose.model('BusStop', busStopSchema);
