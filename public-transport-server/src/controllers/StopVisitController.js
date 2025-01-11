const StopVisit = require('../models/StopVisit');

// Get all stop visits
exports.getAllStopVisits = async (req, res) => {
  try {
    const stopVisits = await StopVisit.find().populate('route stop vehicle');
    res.status(200).json(stopVisits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a stop visit by ID
exports.getStopVisitById = async (req, res) => {
  try {
    const stopVisit = await StopVisit.findById(req.params.id).populate('route stop vehicle');
    if (!stopVisit) return res.status(404).json({ message: 'Stop visit not found' });
    res.status(200).json(stopVisit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a stop visit
exports.createStopVisit = async (req, res) => {
  try {
    const stopVisit = new StopVisit(req.body);
    const savedStopVisit = await stopVisit.save();
    res.status(201).json(savedStopVisit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a stop visit
exports.updateStopVisit = async (req, res) => {
  try {
    const updatedStopVisit = await StopVisit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStopVisit) return res.status(404).json({ message: 'Stop visit not found' });
    res.status(200).json(updatedStopVisit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a stop visit
exports.deleteStopVisit = async (req, res) => {
  try {
    const deletedStopVisit = await StopVisit.findByIdAndDelete(req.params.id);
    if (!deletedStopVisit) return res.status(404).json({ message: 'Stop visit not found' });
    res.status(200).json({ message: 'Stop visit deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
