import React from 'react';
import StopList from './StopList';

const DistrictItem = ({ district, isSelected, onSelect }) => {
  return (
    <div className={`district-item ${isSelected ? 'selected' : ''}`}>
      <div className="district-header">
        <div className="district-info">
          <h4>{district.name}</h4>
          <p>Population: {district.population.toLocaleString()} | Area: {district.area} km²</p>
        </div>
        <button onClick={() => onSelect(isSelected ? null : district)} className="toggle-button">
          {isSelected ? 'Collapse' : 'Manage'}
        </button>
      </div>

      {isSelected && <StopList stops={district.stops} />}
    </div>
  );
};

export default DistrictItem;
