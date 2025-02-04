import React from 'react';
import CityItem from './CityItem';

const CityList = ({ cities, selectedCity, selectedDistrict, onSelectCity, onSelectDistrict, onDeleteCity }) => {
  return (
    <div className="list-container">
      <h2>Cities List</h2>
      <ul className="cities-list">
        {cities.map(city => (
          <CityItem
            key={city._id}
            city={city}
            isSelected={selectedCity?._id === city._id}
            selectedDistrict={selectedDistrict}
            onSelectCity={onSelectCity}
            onSelectDistrict={onSelectDistrict}
            onDelete={onDeleteCity}
          />
        ))}
      </ul>
    </div>
  );
};

export default CityList;
