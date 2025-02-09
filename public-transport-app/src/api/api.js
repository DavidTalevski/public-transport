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

  // Stop Visits
  getStopVisits: () => api.get('/stop-visits'),
  addStopVisit: (stopVisitData) => api.post('/stop-visits', stopVisitData),
  updateStopVisit: (id, stopVisitData) => api.put(`/stop-visits/${id}`, stopVisitData),
  deleteStopVisit: (id) => api.delete(`/stop-visits/${id}`),

  // Vehicles
  getVehicles: () => api.get('/vehicles'),
  addVehicle: (vehicleData) => api.post('/vehicles', vehicleData),
  updateVehicle: (id, vehicleData) => api.put(`/vehicles/${id}`, vehicleData),
  deleteVehicle: (id) => api.delete(`/vehicles/${id}`),
  updateVehicleStatus: (id, status) => api.patch(`/vehicles/${id}/status`, { status }),

};


// Define the districts of Ohrid with their respective details
const districts = [
  { name: 'Old Town', area: 2.5, population: 5000, coordinates: { latitude: 41.1125, longitude: 20.8016 } },
  { name: 'Varosh', area: 3.1, population: 7000, coordinates: { latitude: 41.1130, longitude: 20.7990 } },
  { name: 'Mesokastro', area: 4.2, population: 8500, coordinates: { latitude: 41.1100, longitude: 20.8025 } },
  { name: 'Dolno Konjsko', area: 5.0, population: 6000, coordinates: { latitude: 41.0667, longitude: 20.8000 } },
  { name: 'Lagadin', area: 3.8, population: 4500, coordinates: { latitude: 41.0333, longitude: 20.8000 } },
];

// Function to populate Ohrid and its districts
const populateOhrid = async () => {
  try {
    // Create the city of Ohrid
    const cityResponse = await api.post('/cities', {
      name: 'Ohrid',
      area: 389.93, // Area in square kilometers
      country: "North Macedonia",
      population: 51428,
      coordinates: { latitude: 41.1172, longitude: 20.8016 },
    });
    const cityId = cityResponse.data._id;

    // Add each district to the city
    for (const district of districts) {
      await api.post(`/cities/${cityId}/districts`, district);
    }

    console.log('Ohrid and its districts have been populated successfully.');
  } catch (error) {
    console.error('Error populating Ohrid:', error);
  }
};

window.populateSkopje = populateOhrid;
