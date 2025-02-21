import React, { useEffect, useState } from 'react';
import { apiService } from '../../api/api';

const RouteForm = ({ formData, setFormData, onSubmit }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [stops, setStops] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [currentSelection, setCurrentSelection] = useState({
    city: '',
    district: '',
    stop: ''
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, districtsRes, vehiclesRes] = await Promise.all([
          apiService.getCities(),
          apiService.getAllDistricts(),
          apiService.getAllVehicles()
        ]);

        setCities(citiesRes.data);
        setDistricts(districtsRes.data)
        setVehicles(vehiclesRes.data.filter(v => v.status === 'active'));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentSelection.district) {
      const selectedDistrict = districts.find(d => d._id === currentSelection.district);
      setStops(selectedDistrict?.stops || []);
    } else {
      setStops([]);
    }
  }, [currentSelection.district, districts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentSelection)
    setFormData(prev => ({
      ...prev,
      city: currentSelection.city
    }))
    onSubmit()
  }

  const handleAddStop = () => {
    if (currentSelection.stop) {
      setFormData(prev => ({
        ...prev,
        stops: [...prev.stops, currentSelection.stop]
      }));
      setCurrentSelection(prev => ({ ...prev, stop: '' }));
    }
  };

  const moveStop = (index, direction) => {
    const newStops = [...formData.stops];
    [newStops[index], newStops[index + direction]] = [newStops[index + direction], newStops[index]];
    setFormData(prev => ({ ...prev, stops: newStops }));
  };

  const getStopLocationInfo = (stopId) => {
    for (const district of districts) {
      const stop = district.stops?.find(s => s._id === stopId);
      if (stop) return { city: cities.find(c => c._id === district.city_id).name, district: district.name, stop };
    }
    return { city: 'Unknown', district: 'Unknown', stop: null };
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headerStyle}>
        {formData._id ? 'Edit Route' : 'Create New Route'}
      </h2>

      <div style={columnsContainer}>
        {/* Left Column */}
        <div style={leftColumn}>
          <div style={inputGroup}>
            <label style={labelStyle}>Route Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Select Vehicle:</label>
            <select
              value={formData.vehicle}
              onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              style={selectStyle}
              required
            >
              <option value="">Select a Vehicle</option>
              {vehicles.map(vehicle => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.manufacturer} {vehicle.model} ({vehicle.plateNumber})
                </option>
              ))}
            </select>
          </div>

          <div style={selectionPanel}>
            <h3 style={sectionTitleStyle}>Add Stops</h3>

            {/* City Selection */}
            <div style={inputGroup}>
              <label style={labelStyle}>Select City:</label>
              <select
                value={currentSelection.city}
                onChange={(e) => {
                  setCurrentSelection({
                    city: e.target.value,
                    district: '',
                    stop: ''
                  })

                  setFormData(prev => ({
                    ...prev,
                    city: e.target.value
                  }))
                }}
                style={selectStyle}
              >
                <option value="">Select a City</option>
                {cities.map(city => (
                  <option key={city._id} value={city._id}>{city.name}</option>
                ))}
              </select>
            </div>

            {/* District Selection - Always show if city selected */}
            {currentSelection.city && (
              <div style={inputGroup}>
                <label style={labelStyle}>Select District:</label>
                <select
                  value={currentSelection.district}
                  onChange={(e) => setCurrentSelection(prev => ({
                    ...prev,
                    district: e.target.value,
                    stop: ''
                  }))}
                  style={selectStyle}
                >
                  <option value="">Select a District</option>
                  {districts
                    .filter(d => d.city_id === currentSelection.city)
                    .map(district => (
                      <option key={district._id} value={district._id}>{district.name}</option>
                    ))}
                </select>
              </div>
            )}

            {/* Stop Selection - Show when district selected */}
            {currentSelection.district && (
              <div style={inputGroup}>
                <label style={labelStyle}>Select Stop:</label>
                <select
                  value={currentSelection.stop}
                  onChange={(e) => setCurrentSelection(prev => ({
                    ...prev,
                    stop: e.target.value
                  }))}
                  style={selectStyle}
                >
                  <option value="">Select a Stop</option>
                  {stops.map(stop => (
                    <option key={stop._id} value={stop._id}>{stop.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Add Stop Button */}
            {currentSelection.stop && (
              <button
                type="button"
                onClick={handleAddStop}
                style={addButtonStyle}
              >
                Add Stop to Route
              </button>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={rightColumn}>
          {formData.stops.length > 0 ? (
            <>
              <h3 style={sectionTitleStyle}>
                Route Stops Order ({formData.stops.length})
              </h3>
              <div style={stopsListContainer}>
                {formData.stops.map((stopId, index) => {
                  const { city, district, stop } = getStopLocationInfo(stopId);
                  return (
                    <div key={stopId} style={stopCardStyle}>
                      <div style={stopInfo}>
                        <div style={stopTitle}>
                          {index + 1}. {stop?.name}
                          <span style={locationText}>({city} / {district})</span>
                        </div>
                        {stop?.location && (
                          <div style={coordinatesText}>
                            {stop.location.latitude?.toFixed(4)}, {stop.location.longitude?.toFixed(4)}
                          </div>
                        )}
                      </div>
                      <div style={stopControls}>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => moveStop(index, -1)}
                            style={arrowButton}
                          >
                            ↑
                          </button>
                        )}
                        {index < formData.stops.length - 1 && (
                          <button
                            type="button"
                            onClick={() => moveStop(index, 1)}
                            style={arrowButton}
                          >
                            ↓
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            stops: prev.stops.filter((_, i) => i !== index)
                          }))}
                          style={removeButton}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div style={emptyState}>
              No stops added yet
            </div>
          )}
        </div>
      </div>

      <div style={submitContainer}>
        <button
          type="submit"
          disabled={!formData.name || !formData.vehicle || formData.stops.length === 0}
          style={submitButton}
        >
          {formData._id ? 'Update Route' : 'Create Route'}
        </button>
      </div>
    </form>
  );
};

// Styles
const formStyle = {
  padding: '20px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  maxWidth: '1200px',
  margin: '0 auto',
  height: '90vh',
  overflow: 'hidden',
  backgroundColor: 'white',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const headerStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#1a365d',
  textAlign: 'center',
  margin: '0'
};

const columnsContainer = {
  display: 'grid',
  gridTemplateColumns: '1fr 1.5fr',
  gap: '32px',
  flex: 1,
  overflow: 'hidden'
};

const leftColumn = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  overflowY: 'auto',
  paddingRight: '16px'
};

const rightColumn = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  overflow: 'hidden',
  borderLeft: '2px solid #e2e8f0',
  paddingLeft: '24px'
};

const inputGroup = {
  marginBottom: '16px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '500',
  color: '#4a5568'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #cbd5e0',
  borderRadius: '6px',
  fontSize: '14px',
  backgroundColor: 'white',
  boxSizing: 'border-box'
};

const selectStyle = {
  ...inputStyle,
  backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234a5568"><path d="M7 10l5 5 5-5z"/></svg>")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  backgroundSize: '16px'
};

const selectionPanel = {
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#f7fafc'
};

const sectionTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#2d3748',
  margin: '0 0 20px'
};

const addButtonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#4299e1',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#3182ce'
  }
};

const stopsListContainer = {
  flex: 1,
  overflowY: 'auto',
  paddingRight: '8px',
  marginRight: '-8px'
};

const stopCardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  marginBottom: '8px',
  backgroundColor: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
};

const stopInfo = {
  flex: 1,
  marginRight: '12px'
};

const stopTitle = {
  fontWeight: '500',
  marginBottom: '4px',
  display: 'flex',
  alignItems: 'center'
};

const locationText = {
  fontSize: '12px',
  color: '#718096',
  marginLeft: '8px',
  fontWeight: '400'
};

const coordinatesText = {
  fontSize: '12px',
  color: '#a0aec0'
};

const stopControls = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center'
};

const arrowButton = {
  padding: '6px 10px',
  backgroundColor: '#edf2f7',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  color: '#4a5568',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#e2e8f0'
  }
};

const removeButton = {
  padding: '6px 12px',
  backgroundColor: '#fed7d7',
  color: '#c53030',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#feb2b2'
  }
};

const emptyState = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: '#a0aec0',
  fontSize: '14px'
};

const submitContainer = {
  borderTop: '2px solid #e2e8f0',
  paddingTop: '20px'
};

const submitButton = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#48bb78',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '600',
  transition: 'background-color 0.2s',
  ':disabled': {
    backgroundColor: '#cbd5e0',
    cursor: 'not-allowed'
  },
  ':hover:not(:disabled)': {
    backgroundColor: '#38a169'
  }
};

export default RouteForm;