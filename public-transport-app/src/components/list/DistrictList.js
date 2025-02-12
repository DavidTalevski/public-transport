import React from 'react';
import DistrictItem from '../item/DistrictItem';

const DistrictList = ({ districts, selectedDistrict, onSelectDistrict, onDeleteDistrict }) => {
  return (
    <div className="district-list-container">
      {districts.map(district => (
        <DistrictItem
          key={district._id}
          district={district}
          isSelected={selectedDistrict?._id === district._id}
          onSelect={onSelectDistrict}
          onDeleteDistrict={onDeleteDistrict}
        />
      ))}
    </div>
  );
};

export default DistrictList;
