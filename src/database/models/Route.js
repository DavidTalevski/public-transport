const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true },
  citiesCovered: [String],
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusStop' }],
  frequency: { type: Number, required: true }, // Buses per hour
});

module.exports = mongoose.model('Route', routeSchema);
