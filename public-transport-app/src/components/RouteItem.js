// RouteItem.jsx
import React from 'react';

const RouteItem = ({ route, onDelete, onSelect }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '1.2rem' }}>{route.name}</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => onSelect(route)}
          >
            Edit
          </button>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => onDelete(route._id)}
          >
            Delete
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '15px',
        margin: '15px 0'
      }}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          padding: '8px',
          background: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <label style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '4px' }}>
            Associated Stops
          </label>
          <span style={{ fontWeight: 500, color: '#495057' }}>
            {route.stops.length} stops
          </span>
        </div>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          padding: '8px',
          background: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <label style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '4px' }}>
            Assigned Vehicles
          </label>
          {/* <span style={{ fontWeight: 500, color: '#495057' }}>
            {route.vehicles.length} vehicles
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default RouteItem;