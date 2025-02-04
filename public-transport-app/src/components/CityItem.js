import React from 'react';
import DistrictList from './DistrictList';

const CityItem = ({ city, isSelected, selectedDistrict, onSelectCity, onSelectDistrict, onDelete }) => {
  return (
    <li className={`city-item ${isSelected ? 'selected' : ''}`}>
      <div className="city-info">
        <div>
          <strong>{city.name} ({city.country})</strong>
          <p>Population: {city.population.toLocaleString()} | Area: {city.area} km²</p>
        </div>
        
        <div className="button-group">
          <button className="delete-button" onClick={() => onDelete(city._id)}>Delete</button>
          <button className="select-button" onClick={() => onSelectCity(isSelected ? null : city)}>
            {isSelected ? 'Collapse' : 'Manage'}
          </button>
        </div>
      </div>

      {isSelected && (
        <div className="district-list-container">
          <DistrictList
            districts={city.districts}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={onSelectDistrict}
          />
        </div>
      )}
    </li>
  );
};

export default CityItem;
