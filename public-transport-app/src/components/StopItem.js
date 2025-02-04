import React from 'react';

const StopItem = ({ stop }) => {
  return (
    <div className="stop-item">
      <div>
        <span className="stop-name">{stop.name}</span>
        <span className="stop-location">
          ({stop.location.latitude.toFixed(4)}, {stop.location.longitude.toFixed(4)})
        </span>
      </div>
    </div>
  );
};

export default StopItem;
