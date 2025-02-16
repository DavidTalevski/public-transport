const Route = require('../models/Route');

// Get all routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find().populate('stops').populate("vehicle");
    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a route by ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate('stops').populate("vehicle");
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a route
exports.createRoute = async (req, res) => {
  try {
    const route = new Route(req.body);
    const savedRoute = await route.save();
    res.status(201).json(savedRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a route
exports.updateRoute = async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoute) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json(updatedRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a route
exports.deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json({ message: 'Route deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRouteForCity = async (req, res) => {
  try {
    const routeData = {
      ...req.body,
      city_id: req.params.cityId
    };
    const route = new Route(routeData);
    await route.save();
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};