const City = require('../models/City');
const District = require('../models/District');
const Vehicle = require('../models/Vehicle');
const Route = require('../models/Route');
const Stop = require('../models/Stop')

// Get all cities with full nested relationships
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.status(200).json(city);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCityRoutes = async (req, res) => {
  try {
    const routes = await Route.find({ city_id: req.params.cityId })
      .populate('stops vehicle');
    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCityVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ city_id: req.params.cityId });
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCityDistricts = async (req, res) => {
  try {
    const districts = await District.find({ city_id: req.params.cityId });
    res.status(200).json(districts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCityStops = async (req, res) => {
  try {
    const stops = await Stop.find({ city_id: req.params.cityId });
    res.status(200).json(stops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Rest of the controller methods remain the same
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