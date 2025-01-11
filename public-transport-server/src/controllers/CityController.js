const City = require('../models/City');

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find().populate('districts');
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a city by ID
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate('districts');
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.status(200).json(city);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a city
exports.createCity = async (req, res) => {
  try {
    const city = new City(req.body);
    const savedCity = await city.save();
    res.status(201).json(savedCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a city
exports.updateCity = async (req, res) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCity) return res.status(404).json({ message: 'City not found' });
    res.status(200).json(updatedCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a city
exports.deleteCity = async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndDelete(req.params.id);
    if (!deletedCity) return res.status(404).json({ message: 'City not found' });
    res.status(200).json({ message: 'City deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
