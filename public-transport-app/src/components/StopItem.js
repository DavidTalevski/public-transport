// StopItem.jsx
import React from 'react';

const StopItem = ({ stop, onDeleteStop }) => {

  console.log(stop);
  return (
    <div className="stop-item">
      <div>
        <span className="stop-name">{stop.name}</span>
        <span className="stop-location">
          ({stop.location.latitude.toFixed(4)}, {stop.location.longitude.toFixed(4)})
        </span>
      </div>
      <button onClick={() => onDeleteStop(stop._id)} className="delete-stop-button">
        Delete Stop
      </button>
    </div>
  );
};

export default StopItem;
