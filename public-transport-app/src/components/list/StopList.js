// StopList.jsx
import React, { useState } from 'react';
import StopItem from '../item/StopItem';

const StopList = ({ stops, onDeleteStop, onAddStop }) => {
  const [newStopName, setNewStopName] = useState('');
  const [newStopLatitude, setNewStopLatitude] = useState('');
  const [newStopLongitude, setNewStopLongitude] = useState('');

  const handleAddStop = (e) => {
    e.preventDefault();
    const newStop = {
      _id: Date.now(), // Temporary ID for new stop
      name: newStopName,
      location: {
        latitude: parseFloat(newStopLatitude),
        longitude: parseFloat(newStopLongitude),
      },
    };
    onAddStop(newStop); // Call onAddStop to update the stops
    setNewStopName('');
    setNewStopLatitude('');
    setNewStopLongitude('');
  };
  return (
    <div className="stop-list" style={{ padding: '16px' }}>
      <h5 style={{ margin: '0 0 16px', fontSize: '1.2rem' }}>Transport Stops:</h5>
      {stops.map(stop => (
        <StopItem key={stop._id} stop={stop} onDeleteStop={onDeleteStop} />
      ))}

      <form
        onSubmit={handleAddStop}
        style={{
          marginTop: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}
      >
        <h6 style={{
          gridColumn: '1 / -1',
          margin: '0 0 8px',
          fontSize: '1rem',
          color: '#333'
        }}>
          Add New Stop:
        </h6>

        <input
          type="text"
          value={newStopName}
          onChange={(e) => setNewStopName(e.target.value)}
          placeholder="Stop Name"
          required
          style={{
            gridColumn: '1 / -1',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            // width: '90%'
          }}
        />

        <input
          type="number"
          value={newStopLatitude}
          onChange={(e) => setNewStopLatitude(e.target.value)}
          placeholder="Latitude"
          step="any"
          required
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            // width: '100%'
          }}
        />

        <input
          type="number"
          value={newStopLongitude}
          onChange={(e) => setNewStopLongitude(e.target.value)}
          placeholder="Longitude"
          step="any"
          required
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            // width: '100%'
          }}
        />

        <button
          type="submit"
          style={{
            gridColumn: '1 / -1',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s',
            width: '100%',
            ':hover': {
              backgroundColor: '#45a049'
            }
          }}
        >
          Add Stop
        </button>
      </form>
    </div>
  );
};

export default StopList;
