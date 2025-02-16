import React from 'react';
import CityItem from '../item/CityItem';

const CityList = ({ 
  cities, 
  districtsByCityId, 
  selectedCity, 
  selectedDistrict, 
  onSelectCity, 
  onSelectDistrict, 
  onAddDistrict, 
  onDeleteDistrict, 
  onDeleteCity,
}) => {
  return (
    <div>
      {cities.map(city => (
        <CityItem
          key={city._id}
          city={city}
          districts={districtsByCityId[city._id] || []}
          isSelected={selectedCity?._id === city._id}
          selectedDistrict={selectedDistrict}
          onAddDistrict={onAddDistrict}
          onDeleteDistrict={onDeleteDistrict}
          onSelectCity={onSelectCity}
          onSelectDistrict={onSelectDistrict}
          onDelete={onDeleteCity}
        />
      ))}
    </div>
  );
};

export default CityList;