import React, { useState } from 'react';
import { apiService } from '../../api/api';

const CityForm = ({ fetchCities, onClose }) => {
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
      await apiService.createCity(cityData);
      fetchCities();
      setFormData({
        name: '',
        country: '',
        latitude: '',
        longitude: '',
        population: '',
        area: '',
      });
      if (onClose) onClose();
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '16px', width: '500px' }}>
      <h2 style={titleStyle}>Add New City</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {/* City Name */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>City Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        {/* Country */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        {/* Latitude */}
        <div>
          <label style={labelStyle}>Latitude</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            step="any"
            style={inputStyle}
            required
          />
        </div>

        {/* Longitude */}
        <div>
          <label style={labelStyle}>Longitude</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            step="any"
            style={inputStyle}
            required
          />
        </div>

        {/* Population */}
        <div>
          <label style={labelStyle}>Population</label>
          <input
            type="number"
            name="population"
            value={formData.population}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        {/* Area */}
        <div>
          <label style={labelStyle}>Area (km²)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            step="any"
            style={inputStyle}
            required
          />
        </div>

        {/* Buttons */}
        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '16px' }}>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              style={cancelButtonStyle}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            style={submitButtonStyle}
          >
            Add City
          </button>
        </div>
      </div>
    </form>
  );
};

// Reuse styles from VehicleForm component
const titleStyle = {
  fontSize: '20px', 
  fontWeight: '600', 
  marginBottom: '24px',
  color: '#2c3e50',
  textAlign: 'center'
};

const labelStyle = {
  display: 'block', 
  marginBottom: '8px', 
  fontWeight: '500',
  color: '#495057'
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #ced4da',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box'
};

const submitButtonStyle = {
  flex: 1,
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#218838'
  }
};

const cancelButtonStyle = {
  ...submitButtonStyle,
  backgroundColor: '#6c757d',
  ':hover': {
    backgroundColor: '#5a6268'
  }
};

export default CityForm;