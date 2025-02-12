import React from 'react';
import DistrictList from '../list/DistrictList';

const CityItem = ({ city, isSelected, selectedDistrict, onSelectCity, onSelectDistrict, onDelete, onAddDistrict, onDeleteDistrict }) => {
  return (
    <li className={`city-item ${isSelected ? 'selected' : ''}`}>
      <div className="city-info" >
        <div style={{marginLeft: "10px"}}>
          <h2><strong>{city.name} ({city.country})</strong></h2>
          <p>Population: {city.population.toLocaleString()} | Area: {city.area} km²</p>
        </div>

        <div className="button-group" >
          <button className="delete-button" style={{ minWidth: '120px' }} onClick={() => onDelete(city._id)}>Delete City</button>
          <button className="select-button" style={{ minWidth: '120px' }}onClick={() => onSelectCity(isSelected ? null : city)}>
            {isSelected ? 'Collapse' : 'Manage'}
          </button>
        </div>
      </div>

      {isSelected && (
        <div className="district-list-container">
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10px"}}>
            <button
              onClick={() => onAddDistrict(city._id)}
              className="add-district-button"
              style={{
                padding: '8px 12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                fontSize: '1rem',
                borderRadius: '5px',
                width: '80%',
                maxWidth: '300px',
                textAlign: 'center'
              }}
            >
              Add New District
            </button>
          </div>

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
