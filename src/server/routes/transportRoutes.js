const express = require('express');
const BusStop = require('../../database/models/BusStop');
const Route = require('../../database/models/Route');

const router = express.Router();

// Get all bus stops
router.get('/bus-stops', async (req, res) => {
  try {
    const stops = await BusStop.find({});
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all routes
router.get('/routes', async (req, res) => {
  try {
    const routes = await Route.find({}).populate('stops');
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
