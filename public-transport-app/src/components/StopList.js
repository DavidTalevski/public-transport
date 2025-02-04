import React from 'react';
import StopItem from './StopItem';

const StopList = ({ stops }) => {
  return (
    <div className="stop-list">
      <h5 className="stop-list-title">Transport Stops:</h5>
      {stops.map(stop => (
        <StopItem key={stop._id} stop={stop} />
      ))}
    </div>
  );
};

export default StopList;
