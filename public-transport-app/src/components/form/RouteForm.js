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

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, vehiclesRes] = await Promise.all([
          apiService.getCities(),
          apiService.getVehicles()
        ]);
        
        setCities(citiesRes.data);
        setVehicles(vehiclesRes.data.filter(v => v.status === 'active'));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Update districts when city changes
  useEffect(() => {
    if (currentSelection.city) {
      const selectedCity = cities.find(c => c._id === currentSelection.city);
      setDistricts(selectedCity?.districts || []);
    } else {
      setDistricts([]);
    }
  }, [currentSelection.city, cities]);

  // Update stops when district changes
  useEffect(() => {
    if (currentSelection.district) {
      const selectedDistrict = districts.find(d => d._id === currentSelection.district);
      setStops(selectedDistrict?.stops || []);
    } else {
      setStops([]);
    }
  }, [currentSelection.district, districts]);

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
    const temp = newStops[index];
    newStops[index] = newStops[index + direction];
    newStops[index + direction] = temp;
    
    setFormData(prev => ({
      ...prev,
      stops: newStops
    }));
  };

  const getStopLocationInfo = (stopId) => {
    for (const city of cities) {
      for (const district of city.districts) {
        const stop = district.stops?.find(s => s._id === stopId);
        if (stop) {
          return {
            city: city.name,
            district: district.name,
            stop
          };
        }
      }
    }
    return { city: 'Unknown', district: 'Unknown', stop: null };
  };

  return (
    <form 
      onSubmit={onSubmit} 
      style={{ 
        padding: '20px',
        borderRadius: '8px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto',
        maxHeight: '90vh',
        overflow: 'hidden'
      }}
    >
      <h2 style={{ 
        gridColumn: '1 / -1',
        fontSize: '24px', 
        fontWeight: 600, 
        margin: '0 0 20px',
        color: '#2c3e50',
        textAlign: 'center'
      }}>
        {formData._id ? 'Edit Route' : 'Create New Route'}
      </h2>

      {/* Left Column - Form Inputs */}
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto',
        paddingRight: '16px',
        width: '100%' // Add this to ensure proper width containment
      }}>
        {/* Route Name */}
        <div>
          <label style={labelStyle}>Route Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle}
            required
          />
        </div>

        {/* Vehicle Selection */}
        <div>
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

        {/* Stop Selection Panel */}
        <div style={{ 
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          backgroundColor: '#f8fafc'
        }}>
          <h3 style={sectionTitleStyle}>Add Stops</h3>
          
          {/* City Selection */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Select City:</label>
            <select
              value={currentSelection.city}
              onChange={(e) => setCurrentSelection({ 
                ...currentSelection, 
                city: e.target.value, 
                district: '', 
                stop: '' 
              })}
              style={selectStyle}
            >
              <option value="">Select a City</option>
              {cities.map(city => (
                <option key={city._id} value={city._id}>{city.name}</option>
              ))}
            </select>
          </div>

          {/* District Selection */}
          {currentSelection.city && (
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Select District:</label>
              <select
                value={currentSelection.district}
                onChange={(e) => setCurrentSelection({ 
                  ...currentSelection, 
                  district: e.target.value, 
                  stop: '' 
                })}
                style={selectStyle}
              >
                <option value="">Select a District</option>
                {districts.map(district => (
                  <option key={district._id} value={district._id}>{district.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Stop Selection */}
          {currentSelection.district && (
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Select Stop:</label>
              <select
                value={currentSelection.stop}
                onChange={(e) => setCurrentSelection({ ...currentSelection, stop: e.target.value })}
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

      {/* Right Column - Selected Stops */}
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflowY: 'auto',
        borderLeft: '1px solid #e2e8f0',
        paddingLeft: '24px'
      }}>
        {formData.stops.length > 0 ? (
          <>
            <h3 style={sectionTitleStyle}>
              Route Stops Order ({formData.stops.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {formData.stops.map((stopId, index) => {
                const { city, district, stop } = getStopLocationInfo(stopId);
                
                return (
                  <div key={`${stopId}-${index}`} style={stopCardStyle}>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                        {index + 1}. {stop?.name || 'Unknown Stop'}
                        <span style={locationStyle}>
                          ({city} / {district})
                        </span>
                      </div>
                      {stop?.location && (
                        <div style={coordinatesStyle}>
                          {stop.location.latitude?.toFixed(4)}, {stop.location.longitude?.toFixed(4)}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => moveStop(index, -1)}
                          style={arrowButtonStyle}
                        >
                          ↑
                        </button>
                      )}
                      {index < formData.stops.length - 1 && (
                        <button
                          type="button"
                          onClick={() => moveStop(index, 1)}
                          style={arrowButtonStyle}
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
                        // style={removeButtonStyle}
                        className='delete-button'
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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#64748b'
          }}>
            No stops added yet
          </div>
        )}
      </div>

      {/* Submit Button - Full width at bottom */}
      <div style={{ 
        gridColumn: '1 / -1',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '20px'
      }}>
        <button
          type="submit"
          disabled={!formData.name || !formData.vehicle || formData.stops.length === 0}
          style={submitButtonStyle}
        >
          {formData._id ? 'Update Route' : 'Create Route'}
        </button>
      </div>
    </form>
  );
};

// Style variables
const labelStyle = {
  display: 'block', 
  marginBottom: '8px',
  fontWeight: '500',
  color: '#475569'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  fontSize: '14px',
  backgroundColor: 'white',
  boxSizing: 'border-box' // Add this line
};

const selectStyle = {
  ...inputStyle, // Now inherits box-sizing
  appearance: 'none',
  backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M6 9L12 15L18 9\' stroke=\'%23475569\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/></svg>")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  backgroundSize: '16px'
};

const sectionTitleStyle = {
  margin: '0 0 16px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#1e293b'
};

const addButtonStyle = {
  backgroundColor: '#3b82f6',
  color: 'white',
  padding: '10px 16px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
  fontSize: '14px',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#2563eb'
  }
};

const stopCardStyle = {
  padding: '12px',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  display: 'flex',
  gap: '12px',
  alignItems: 'start',
  backgroundColor: 'white',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
};

const locationStyle = {
  fontSize: '12px', 
  color: '#64748b', 
  marginLeft: '8px',
  fontWeight: '400'
};

const coordinatesStyle = {
  fontSize: '12px',
  color: '#94a3b8'
};

const arrowButtonStyle = {
  backgroundColor: '#e2e8f0',
  color: '#475569',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 10px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#cbd5e1'
  }
};

const removeButtonStyle = {
  backgroundColor: '#fee2e2',
  color: '#dc2626',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 12px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#fecaca'
  }
};

const submitButtonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '6px',
  width: '100%',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#2563eb'
  },
  ':disabled': {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed'
  }
};

export default RouteForm;