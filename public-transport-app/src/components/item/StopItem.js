import React from 'react';

const StopItem = ({ stop, onDeleteStop }) => {
  return (
    <div className="stop-item" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #ddd'
    }}>
      <div>
        <span className="stop-name" style={{ fontWeight: 'bold' }}>{stop.name}</span>
        <span className="stop-location" style={{ marginLeft: '8px', color: '#555' }}>
          ({stop.location.latitude.toFixed(4)}, {stop.location.longitude.toFixed(4)})
        </span>
      </div>
      <button 
        onClick={() => onDeleteStop(stop._id)} 
        className="delete-button"
        style={{
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Delete Stop
      </button>
    </div>
  );
};

export default StopItem;
