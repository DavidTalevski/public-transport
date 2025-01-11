import React, { useState } from 'react';
import { apiService } from '../api/api'; // Import the centralized API service

const CityForm = ({ fetchCities }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    latitude: '',
    longitude: '',
    population: '',
    area: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, country, latitude, longitude, population, area } = formData;
      const cityData = {
        name,
        country,
        coordinates: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        population: parseInt(population, 10),
        area: parseFloat(area),
      };
      await apiService.addCity(cityData); // Use apiService to add a city
      fetchCities(); // Refresh the cities list
      setFormData({
        name: '',
        country: '',
        latitude: '',
        longitude: '',
        population: '',
        area: '',
      });
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };

  return (
    <form className="city-form" onSubmit={handleSubmit}>
      <h2>Add a New City</h2>
      <div className="form-group">
        <label htmlFor="name">City Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="number"
          id="latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="number"
          id="longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="population">Population:</label>
        <input
          type="number"
          id="population"
          name="population"
          value={formData.population}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="area">Area (sq km):</label>
        <input
          type="number"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      <button type="submit">Add City</button>
    </form>
  );
};

export default CityForm;
