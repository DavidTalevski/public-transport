import React, { useEffect, useState } from 'react';
import { apiService } from '../api/api';

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
        padding: '16px', 
        maxWidth: '600px', 
        margin: '0 auto',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 600, 
        marginBottom: '24px',
        color: '#2c3e50',
        textAlign: 'center'
      }}>
        {formData._id ? 'Edit Route' : 'Create New Route'}
      </h2>

      {/* Route Name */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px',
          fontWeight: '500',
          color: '#495057'
        }}>
          Route Name:
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ced4da',
            borderRadius: '6px',
            fontSize: '16px'
          }}
          required
        />
      </div>

      {/* Vehicle Selection */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px',
          color: '#495057'
        }}>
          Select Vehicle:
        </label>
        <select
          value={formData.vehicle}
          onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
          style={{ 
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ced4da',
            fontSize: '16px'
          }}
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

      {/* Stop Selection */}
      <div style={{ 
        marginBottom: '24px', 
        border: '1px solid #dee2e6',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        <h3 style={{ 
          margin: '0 0 20px',
          fontSize: '18px',
          color: '#212529'
        }}>
          Add Stops in Order
        </h3>

        {/* City Selection */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            color: '#495057'
          }}>
            Select City:
          </label>
          <select
            value={currentSelection.city}
            onChange={(e) => setCurrentSelection({ 
              ...currentSelection, 
              city: e.target.value, 
              district: '', 
              stop: '' 
            })}
            style={{ 
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ced4da',
              fontSize: '16px'
            }}
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
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#495057'
            }}>
              Select District:
            </label>
            <select
              value={currentSelection.district}
              onChange={(e) => setCurrentSelection({ 
                ...currentSelection, 
                district: e.target.value, 
                stop: '' 
              })}
              style={{ 
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ced4da',
                fontSize: '16px'
              }}
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
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#495057'
            }}>
              Select Stop:
            </label>
            <select
              value={currentSelection.stop}
              onChange={(e) => setCurrentSelection({ ...currentSelection, stop: e.target.value })}
              style={{ 
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ced4da',
                fontSize: '16px'
              }}
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
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              fontSize: '16px',
              marginTop: '16px',
              transition: 'background-color 0.2s',
              ':hover': {
                backgroundColor: '#059669'
              }
            }}
          >
            Add Stop to Route
          </button>
        )}
      </div>

      {/* Selected Stops List */}
      {formData.stops.length > 0 && (
        <div style={{ 
          marginBottom: '24px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: 'white',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <h3 style={{ 
            margin: '0 0 16px',
            fontSize: '18px',
            color: '#212529'
          }}>
            Route Stops Order ({formData.stops.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {formData.stops.map((stopId, index) => {
              const { city, district, stop } = getStopLocationInfo(stopId);
              
              return (
                <div 
                  key={`${stopId}-${index}`}
                  style={{
                    padding: '16px',
                    border: '1px solid #e9ecef',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontWeight: '500' }}>{index + 1}.</div>
                    <div>
                      <div style={{ fontWeight: '500' }}>
                        {stop?.name || 'Unknown Stop'}
                        <span style={{ 
                          fontSize: '14px', 
                          color: '#6c757d', 
                          marginLeft: '8px',
                          fontStyle: 'italic'
                        }}>
                          ({city} / {district})
                        </span>
                      </div>
                      {stop?.location && (
                        <div style={{ fontSize: '14px', color: '#6c757d' }}>
                          Coordinates: {stop.location.latitude?.toFixed(4)}, {stop.location.longitude?.toFixed(4)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveStop(index, -1)}
                        style={{
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          ':hover': {
                            backgroundColor: '#2563eb'
                          }
                        }}
                      >
                        ↑
                      </button>
                    )}
                    {index < formData.stops.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveStop(index, 1)}
                        style={{
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          ':hover': {
                            backgroundColor: '#2563eb'
                          }
                        }}
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
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        ':hover': {
                          backgroundColor: '#dc2626'
                        }
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!formData.name || !formData.vehicle || formData.stops.length === 0}
        style={{
          backgroundColor: formData.name && formData.vehicle && formData.stops.length ? '#2563eb' : '#94a3b8',
          color: 'white',
          padding: '14px 28px',
          borderRadius: '6px',
          width: '100%',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.2s',
          ':hover': {
            backgroundColor: formData.name && formData.vehicle && formData.stops.length ? '#1d4ed8' : '#94a3b8'
          }
        }}
      >
        {formData._id ? 'Update Route' : 'Create Route'}
      </button>
    </form>
  );
};

export default RouteForm;