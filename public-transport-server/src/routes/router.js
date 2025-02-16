const express = require('express');
const router = express.Router();
const CityController = require('../controllers/CityController');
const DistrictController = require('../controllers/DistrictController');
const StopController = require('../controllers/StopController');
const RouteController = require('../controllers/RouteController');
const VehicleController = require('../controllers/VehicleController');

// City-Centric Routes
router.get('/cities', CityController.getAllCities);
router.post('/cities', CityController.createCity);
router.get('/cities/:id', CityController.getCityById);
router.put('/cities/:id', CityController.updateCity);
router.delete('/cities/:id', CityController.deleteCity);

// City Relationships
router.get('/cities/:cityId/districts', CityController.getCityDistricts);
router.get('/cities/:cityId/stops', CityController.getCityStops);
router.get('/cities/:cityId/routes', CityController.getCityRoutes);
router.get('/cities/:cityId/vehicles', CityController.getCityVehicles);

// District Operations
router.post('/cities/:cityId/districts', DistrictController.createDistrictForCity);
router.get('/districts', DistrictController.getAllDistricts);
router.get('/districts/:id', DistrictController.getDistrictById);
router.put('/districts/:id', DistrictController.updateDistrict);
router.delete('/districts/:id', DistrictController.deleteDistrict);

// District-Stop Relationships
router.post('/districts/:districtId/stops', StopController.createStopForDistrict);
router.get('/districts/:districtId/stops', StopController.getStopsByDistrict);

// Stop Operations
router.get('/stops', StopController.getAllStops);
router.get('/stops/:id', StopController.getStopById);
router.put('/stops/:id', StopController.updateStop);
router.delete('/stops/:id', StopController.deleteStop);

// Route Operations
router.post('/cities/:cityId/routes', RouteController.createRouteForCity);
router.get('/routes', RouteController.getAllRoutes);
router.get('/routes/:id', RouteController.getRouteById);
router.put('/routes/:id', RouteController.updateRoute);
router.delete('/routes/:id', RouteController.deleteRoute);

// Vehicle Operations
router.post('/cities/:cityId/vehicles', VehicleController.createVehicleForCity);
router.get('/vehicles', VehicleController.getAllVehicles);
router.get('/vehicles/:id', VehicleController.getVehicleById);
router.put('/vehicles/:id', VehicleController.updateVehicle);
router.get('/cities/:cityId/vehicles', VehicleController.getVehiclesByCity);
router.delete('/vehicles/:id', VehicleController.deleteVehicle);
router.patch('/vehicles/:id/status', VehicleController.updateVehicleStatus);

module.exports = router;