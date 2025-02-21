// components/CitySelector.js
import React from 'react';

const CitySelector = ({ cities, selectedCity, onSelectCity }) => (
  <div style={{ minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <label style={{ fontSize: '16px', color: '#2c3e50', fontWeight: '600' }}>
      Select City
    </label>
    <select
      value={selectedCity || ''}
      onChange={(e) => onSelectCity(e.target.value)}
      style={{
        padding: '10px 15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '16px',
        backgroundColor: '#f9f9f9',
        color: '#333',
        outline: 'none',
        transition: 'border-color 0.3s ease',
      }}
    >
      <option value="" disabled>Select a city</option>
      {cities.map(city => (
        <option key={city._id} value={city._id}>
          {city.name}
        </option>
      ))}
    </select>
  </div>
);

export default CitySelector;
