import React from 'react';
import DistrictList from './DistrictList';

const CityItem = ({ city, isSelected, selectedDistrict, onSelectCity, onSelectDistrict, onDelete, onAddDistrict, onDeleteDistrict }) => {
  return (
    <li className={`city-item ${isSelected ? 'selected' : ''}`}>
      <div className="city-info">
        <div>
          <strong>{city.name} ({city.country})</strong>
          <p>Population: {city.population.toLocaleString()} | Area: {city.area} km²</p>
        </div>
        
        <div className="button-group">
          <button className="delete-button" onClick={() => onDelete(city._id)}>Delete City</button>
          <button className="select-button" onClick={() => onSelectCity(isSelected ? null : city)}>
            {isSelected ? 'Collapse' : 'Manage'}
          </button>
        </div>
      </div>

      {isSelected && (
        <div className="district-list-container">
          <button 
            onClick={() => onAddDistrict(city._id)} 
            className="add-district-button"
            style={{ marginBottom: '10px', padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Add New District
          </button>

          <DistrictList
            districts={city.districts}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={onSelectDistrict}
            onDeleteDistrict={onDeleteDistrict}
          />
        </div>
      )}
    </li>
  );
};

export default CityItem;
