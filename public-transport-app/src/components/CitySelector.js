// components/CitySelector.js
import React from 'react';

const CitySelector = ({ cities, selectedCity, onSelectCity }) => (
  <div style={{ minWidth: '200px' }}>
    <select 
      value={selectedCity || ''}
      onChange={(e) => onSelectCity(e.target.value)}
      style={{
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px'
      }}
    >
      {cities.map(city => (
        <option key={city._id} value={city._id}>
          {city.name}
        </option>
      ))}
    </select>
  </div>
);

export default CitySelector;