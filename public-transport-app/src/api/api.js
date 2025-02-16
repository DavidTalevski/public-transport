import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const apiService = {
  // Cities
  getCities: () => api.get('/cities'),
  getCityDetails: (id) => api.get(`/cities/${id}`),
  createCity: (data) => api.post('/cities', data),
  updateCity: (id, data) => api.put(`/cities/${id}`, data),
  deleteCity: (id) => api.delete(`/cities/${id}`),

  // City Relationships
  getCityDistricts: (cityId) => api.get(`/cities/${cityId}/districts`),
  getCityStops: (cityId) => api.get(`/cities/${cityId}/stops`),
  getCityRoutes: (cityId) => api.get(`/cities/${cityId}/routes`),
  getCityVehicles: (cityId) => api.get(`/cities/${cityId}/vehicles`),

  // Districts
  createDistrict: (cityId, data) => api.post(`/cities/${cityId}/districts`, data),
  getDistrict: (id) => api.get(`/districts/${id}`),
  getAllDistricts: (id) => api.get(`/districts/`),
  updateDistrict: (id, data) => api.put(`/districts/${id}`, data),
  deleteDistrict: (id) => api.delete(`/districts/${id}`),

  // District-Stops
  addStopToDistrict: (districtId, data) => api.post(`/districts/${districtId}/stops`, data),
  getDistrictStops: (districtId) => api.get(`/districts/${districtId}/stops`),

  // Routes
  createRoute: (cityId, data) => api.post(`/cities/${cityId}/routes`, data),
  getAllRoutes: (id) => api.get(`/routes/`),
  getRoute: (id) => api.get(`/routes/${id}`),
  updateRoute: (id, data) => api.put(`/routes/${id}`, data),
  deleteRoute: (id) => api.delete(`/routes/${id}`),

  // Vehicles
  createVehicle: (cityId, data) => api.post(`/cities/${cityId}/vehicles`, data),
  getVehicle: (id) => api.get(`/vehicles/${id}`),
  getAllVehicles: () => api.get('/vehicles'), // Add this
  getCityVehicles: (cityId) => api.get(`/cities/${cityId}/vehicles`), // Fix typo in path
  updateVehicle: (id, data) => api.put(`/vehicles/${id}`, data),
  updateVehicleStatus: (id, status) => api.patch(`/vehicles/${id}/status`, { status }),
  deleteVehicle: (id) => api.delete(`/vehicles/${id}`),

  // Stops
  getStop: (id) => api.get(`/stops/${id}`),
  updateStop: (id, data) => api.put(`/stops/${id}`, data),
  deleteStop: (id) => api.delete(`/stops/${id}`)
};