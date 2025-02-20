const Stop = require('../models/Stop');
const District = require("../models/District")

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
    const stop = await Stop.findById(req.params.id);
    if (!stop) return res.status(404).json({ message: 'Stop not found' });
    await stop.deleteOne();
    res.status(200).json({ message: 'Stop deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStopsByDistrict = async (req, res) => {
  try {
    const district = await District.findById(req.params.districtId).populate('stops');
    if (!district) return res.status(404).json({ message: 'District not found' });
    res.status(200).json(district.stops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.createStopForDistrict = async (req, res) => {
  try {
    // 1. Find the district without population
    const district = await District.findById(req.params.districtId);

    if (!district) {
      return res.status(404).json({ message: 'District not found' });
    }

    // 2. Validate request body
    if (!req.body.name || !req.body.location) {
      return res.status(400).json({ message: 'Name and location are required' });
    }

    // 3. Create stop data
    const stopData = {
      name: req.body.name,
      location: req.body.location,
      city_id: district.city_id,  // Directly use district's city_id
      district: district._id
    };

    // 4. Create and save stop
    const stop = new Stop(stopData);
    await stop.save();

    // 5. Update district's stops array
    await District.findByIdAndUpdate(
      district._id,
      { $push: { stops: stop._id } }
    );

    // 6. Return response
    res.status(201).json(stop);
  } catch (err) {
    res.status(400).json({ 
      message: err.message,
      errors: err.errors ? Object.values(err.errors).map(e => e.message) : []
    });
  }
};