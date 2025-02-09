const express = require('express');
const router = express.Router();

const City = require('../models/City');
const District = require('../models/District');
const Stop = require('../models/Stop');

const CityController = require('../controllers/CityController');
const DistrictController = require('../controllers/DistrictController');
const StopController = require('../controllers/StopController');
const RouteController = require('../controllers/RouteController');
const StopVisitController = require('../controllers/StopVisitController');
const VehicleController = require('../controllers/VehicleController');

// City Routes
router.get('/cities', CityController.getAllCities);
router.post('/cities', CityController.createCity);
router.get('/cities/:id', CityController.getCityById);
router.put('/cities/:id', CityController.updateCity);
router.delete('/cities/:id', CityController.deleteCity);
router.post('/cities/:cityId/districts', async (req, res) => {
    const { cityId } = req.params;
    const { name, population, area, coordinates } = req.body;
  
    try {
      // Create a new district
      const newDistrict = new District({ name, population, area, coordinates });
      await newDistrict.save();
  
      // Add district to the city's district array
      const city = await City.findById(cityId);
      city.districts.push(newDistrict._id);
      await city.save();
  
      res.status(201).json({ message: 'District added successfully', district: newDistrict });
    } catch (error) {
      console.error('Error adding district:', error);
      res.status(500).json({ error: 'Failed to add district' });
    }
  });

// District Routes
router.get('/districts', DistrictController.getAllDistricts);
router.post('/districts', DistrictController.createDistrict);
router.get('/districts/:id', DistrictController.getDistrictById);
router.put('/districts/:id', DistrictController.updateDistrict);
router.delete('/districts/:id', DistrictController.deleteDistrict);
// Add a stop to a district
router.post('/districts/:districtId/stops', async (req, res) => {
    const { districtId } = req.params;
    const { name, location } = req.body;
  
    try {
      const stop = new Stop({ name, location });
      await stop.save();
  
      const district = await District.findById(districtId);
      if (!district) {
        return res.status(404).json({ message: 'District not found' });
      }
  
      district.stops.push(stop._id);
      await district.save();
  
      res.status(201).json({ message: 'Stop added to district', stop });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

router.get('/:districtId/stops', async (req, res) => {
    const { districtId } = req.params;
  
    try {
      const district = await District.findById(districtId).populate('stops');
      if (!district) {
        return res.status(404).json({ message: 'District not found' });
      }
  
      res.status(200).json({ stops: district.stops });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

// Stop Routes
router.get('/stops', StopController.getAllStops);
router.post('/stops', StopController.createStop);
router.get('/stops/:id', StopController.getStopById);
router.put('/stops/:id', StopController.updateStop);
router.delete('/stops/:id', StopController.deleteStop);

// Route Routes
router.get('/routes', RouteController.getAllRoutes);
router.post('/routes', RouteController.createRoute);
router.get('/routes/:id', RouteController.getRouteById);
router.put('/routes/:id', RouteController.updateRoute);
router.delete('/routes/:id', RouteController.deleteRoute);

// StopVisit Routes
router.get('/stop-visits', StopVisitController.getAllStopVisits);
router.post('/stop-visits', StopVisitController.createStopVisit);
router.get('/stop-visits/:id', StopVisitController.getStopVisitById);
router.put('/stop-visits/:id', StopVisitController.updateStopVisit);
router.delete('/stop-visits/:id', StopVisitController.deleteStopVisit);

// Vehicle Routes
router.get('/vehicles', VehicleController.getAllVehicles);
router.post('/vehicles', VehicleController.createVehicle);
router.get('/vehicles/:id', VehicleController.getVehicleById);
router.put('/vehicles/:id', VehicleController.updateVehicle);
router.delete('/vehicles/:id', VehicleController.deleteVehicle);
router.patch('/vehicles/:id/status', VehicleController.updateVehicleStatus);

module.exports = router;
