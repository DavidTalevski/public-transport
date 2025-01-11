const Stop = require('../models/Stop');

// Get all stops
exports.getAllStops = async (req, res) => {
  try {
    const stops = await Stop.find();
    res.status(200).json(stops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a stop by ID
exports.getStopById = async (req, res) => {
  try {
    const stop = await Stop.findById(req.params.id);
    if (!stop) return res.status(404).json({ message: 'Stop not found' });
    res.status(200).json(stop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a stop
exports.createStop = async (req, res) => {
  try {
    const stop = new Stop(req.body);
    const savedStop = await stop.save();
    res.status(201).json(savedStop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a stop
exports.updateStop = async (req, res) => {
  try {
    const updatedStop = await Stop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStop) return res.status(404).json({ message: 'Stop not found' });
    res.status(200).json(updatedStop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a stop
exports.deleteStop = async (req, res) => {
  try {
    const deletedStop = await Stop.findByIdAndDelete(req.params.id);
    if (!deletedStop) return res.status(404).json({ message: 'Stop not found' });
    res.status(200).json({ message: 'Stop deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
