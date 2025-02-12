import React, { useState } from 'react';
import StopList from '../list/StopList';
import { apiService } from '../../api/api';

const DistrictItem = ({ district, isSelected, onSelect, onDeleteDistrict, onUpdateStops }) => {
  const [districtStops, setDistrictStops] = useState(district.stops);

  // Function to handle stop deletion
  const handleDeleteStop = async (stopId) => {
    try {
      // Delete stop using API service
      await apiService.deleteStop(stopId);

      // Remove stop from the local state
      const updatedStops = districtStops.filter(stop => stop._id !== stopId);
      setDistrictStops(updatedStops);

      // Update parent component (Cities.jsx) to reflect the changes
      onUpdateStops(district._id, updatedStops);
    } catch (error) {
      console.error("Error deleting stop:", error);
    }
  };

  // Function to handle adding a new stop
  const handleAddStop = async (newStop) => {
    try {
      // Add stop using API service
      const response = await apiService.addStopToDistrict(district._id, newStop);
      const addedStop = response.data.stop;

      // Update local state with the new stop
      const updatedStops = [...districtStops, addedStop];
      setDistrictStops(updatedStops);

      // Update parent component (Cities.jsx) to reflect the changes
      onUpdateStops(district._id, updatedStops);
    } catch (error) {
      console.error("Error adding stop:", error);
    }
  };

  return (
    <div className={`district-item ${isSelected ? 'selected' : ''}`}>
      <div className="district-header">
        <div className="district-info">
          <h4>{district.name}</h4>
          <p>Population: {district.population.toLocaleString()} | Area: {district.area} km²</p>
        </div>
        <div className="button-group">
          <button
            onClick={() => onSelect(isSelected ? null : district)}
            className="toggle-button"
            style={{ minWidth: '120px' }}
          >
            {isSelected ? 'Collapse' : 'Manage'}
          </button>

          <button
            onClick={() => onDeleteDistrict(district._id)}
            className="delete-button"
            style={{ minWidth: '120px' }}
          >
            Delete District
          </button>
        </div>

      </div>

      {isSelected && (
        <StopList
          stops={districtStops}
          onDeleteStop={handleDeleteStop}
          onAddStop={handleAddStop}
        />
      )}
    </div>
  );
};

export default DistrictItem;
