// StopList.jsx
import React, { useState } from 'react';
import StopItem from './StopItem';

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
    <div className="stop-list">
      <h5 className="stop-list-title">Transport Stops:</h5>
      {stops.map(stop => (
        <StopItem key={stop._id} stop={stop} onDeleteStop={onDeleteStop} />
      ))}
      
      <form onSubmit={handleAddStop} className="add-stop-form">
        <h6>Add New Stop:</h6>
        <input
          type="text"
          value={newStopName}
          onChange={(e) => setNewStopName(e.target.value)}
          placeholder="Stop Name"
          required
        />
        <input
          type="number"
          value={newStopLatitude}
          onChange={(e) => setNewStopLatitude(e.target.value)}
          placeholder="Latitude"
          step="any"
          required
        />
        <input
          type="number"
          value={newStopLongitude}
          onChange={(e) => setNewStopLongitude(e.target.value)}
          placeholder="Longitude"
          step="any"
          required
        />
        <button type="submit" className="add-stop-button">Add Stop</button>
      </form>
    </div>
  );
};

export default StopList;
