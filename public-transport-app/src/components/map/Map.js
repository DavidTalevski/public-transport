// Map.jsx
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ stops, routes }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routePath, setRoutePath] = useState(null);
  const mapRef = useRef();
  const center = [41.6086, 21.7453];

  useEffect(() => {
    const fetchRoutePath = async () => {
      if (!selectedRoute?.stops) return;

      try {
        // Convert stops to OSRM format coordinates (lon,lat)
        const coordinates = selectedRoute.stops
          .filter(stop => stop.location?.latitude && stop.location?.longitude)
          .map(stop => `${stop.location.longitude},${stop.location.latitude}`)
          .join(';');

        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
        );

        const data = await response.json();
        if (data.routes?.[0]?.geometry?.coordinates) {
          const path = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          setRoutePath(path);

          // Update map view to show the route
          if (path.length > 0 && mapRef.current) {
            const bounds = L.latLngBounds(path);
            mapRef.current.flyToBounds(bounds, { padding: [50, 50] });
          }
        }
      } catch (error) {
        console.error('Error fetching route path:', error);
      }
    };

    fetchRoutePath();
  }, [selectedRoute]);

  return (
    <div style={{
      height: '400px',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Map Container */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 0
      }}>
        <MapContainer
          center={center}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* All Stops */}
          {stops.map((stop, index) => (
            stop.location?.latitude && stop.location?.longitude && (
              <Marker
                key={`all-stop-${stop._id}-${index}`} // Unique key with index
                position={[stop.location.latitude, stop.location.longitude]}
              >
                <Popup>
                  <div style={{ minWidth: '150px' }}>
                    <h4 style={{ margin: '0 0 8px' }}>{stop.name}</h4>
                    <div style={{ fontSize: '0.9em' }}>
                      <div>Lat: {stop.location.latitude.toFixed(4)}</div>
                      <div>Lon: {stop.location.longitude.toFixed(4)}</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          ))}

          {/* Selected Route Path */}
          {routePath && (
            <Polyline
              positions={routePath}
              pathOptions={{ color: '#ff0000', weight: 4 }}
            />
          )}
        </MapContainer>
      </div>

      {/* Controls Section */}
      <div style={{
        padding: '16px 16px 0',
        zIndex: 1000,
        position: 'relative',
        background: 'white'
      }}>
        <select
          onChange={(e) => setSelectedRoute(routes.find(r => r._id === e.target.value))}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="">Select a Route</option>
          {routes.map((route) => (
            <option key={route._id} value={route._id}>
              {route.name} ({route.stops.length} stops)
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default Map;