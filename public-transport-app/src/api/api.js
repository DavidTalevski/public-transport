import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL:'http://localhost:5000/api', // Use environment variable or fallback to default
});

// Centralized API methods
export const apiService = {
  // Cities
  getCities: () => api.get('/cities'),
  addCity: (cityData) => api.post('/cities', cityData),
  updateCity: (id, cityData) => api.put(`/cities/${id}`, cityData),
  deleteCity: (id) => api.delete(`/cities/${id}`),

  // Districts
  getDistricts: () => api.get('/districts'),
  addDistrict: (districtData) => api.post('/districts', districtData),
  updateDistrict: (id, districtData) => api.put(`/districts/${id}`, districtData),
  deleteDistrict: (id) => api.delete(`/districts/${id}`),

  // Add District to a City
  addDistrictToCity: (cityId, districtData) => api.post(`/cities/${cityId}/districts`, districtData),

  // Stops
  getStops: () => api.get('/stops'),
  addStop: (stopData) => api.post('/stops', stopData),
  updateStop: (id, stopData) => api.put(`/stops/${id}`, stopData),
  deleteStop: (id) => api.delete(`/stops/${id}`),

  addStopToDistrict: (districtId, stopData) => api.post(`/districts/${districtId}/stops`, stopData),

  // Routes
  getRoutes: () => api.get('/routes'),
  addRoute: (routeData) => api.post('/routes', routeData),
  updateRoute: (id, routeData) => api.put(`/routes/${id}`, routeData),
  deleteRoute: (id) => api.delete(`/routes/${id}`),

  // Vehicles
  getVehicles: () => api.get('/vehicles'),
  addVehicle: (vehicleData) => api.post('/vehicles', vehicleData),
  updateVehicle: (id, vehicleData) => api.put(`/vehicles/${id}`, vehicleData),
  deleteVehicle: (id) => api.delete(`/vehicles/${id}`),
  updateVehicleStatus: (id, status) => api.patch(`/vehicles/${id}/status`, { status }),

};