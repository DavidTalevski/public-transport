import React, { useState, useEffect } from 'react';
import StopList from '../list/StopList';
import { apiService } from '../../api/api';

const DistrictItem = ({ district, isSelected, onSelect, onDeleteDistrict }) => {
  const [districtStops, setDistrictStops] = useState([]);
  const [isLoadingStops, setIsLoadingStops] = useState(false);

  // Fetch stops when the district is selected
  useEffect(() => {
    const fetchStops = async () => {
      if (isSelected) {
        setIsLoadingStops(true);
        try {
          const response = await apiService.getDistrictStops(district._id);
          setDistrictStops(response.data);
        } catch (error) {
          console.error("Error fetching stops:", error);
        } finally {
          setIsLoadingStops(false);
        }
      }
    };
    fetchStops();
  }, [isSelected, district._id]);

  // Handle stop deletion
  const handleDeleteStop = async (stopId) => {
    try {
      await apiService.deleteStop(stopId);
      setDistrictStops(prev => prev.filter(stop => stop._id !== stopId));
    } catch (error) {
      console.error("Error deleting stop:", error);
    }
  };

  // Handle adding a new stop
  const handleAddStop = async (newStop) => {
    try {
      const response = await apiService.addStopToDistrict(district._id, newStop);
      setDistrictStops(prev => [...prev, response.data]);
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
        isLoadingStops 
          ? <div>Loading stops...</div>
          : <StopList
              stops={districtStops}
              onDeleteStop={handleDeleteStop}
              onAddStop={handleAddStop}
            />
      )}
    </div>
  );
};

export default DistrictItem;