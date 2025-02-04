import React from 'react';
import DistrictItem from './DistrictItem';

const DistrictList = ({ districts, selectedDistrict, onSelectDistrict }) => {
  return (
    <div className="district-list-container">
      {districts.map(district => (
        <DistrictItem
          key={district._id}
          district={district}
          isSelected={selectedDistrict?._id === district._id}
          onSelect={onSelectDistrict}
        />
      ))}
    </div>
  );
};

export default DistrictList;
