// RouteList.jsx
import React from 'react';
import RouteItem from './RouteItem';

const RouteList = ({ routes, onDeleteRoute, onSelectRoute }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {routes.map(route => (
        <RouteItem
          key={route._id}
          route={route}
          onDelete={onDeleteRoute}
          onSelect={onSelectRoute}
        />
      ))}
    </div>
  );
};

export default RouteList;