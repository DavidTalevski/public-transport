import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ stops }) => {
  // Center coordinates for North Macedonia (approximate center)
  const center = [41.6086, 21.7453];

  // Filter stops with valid coordinates
  const validStops = stops.filter(stop => 
    stop.location?.latitude && 
    stop.location?.longitude &&
    typeof stop.location.latitude === 'number' &&
    typeof stop.location.longitude === 'number'
  );

  return (
    <div style={{ height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer center={center} zoom={7} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {validStops.map((stop, index) => (
          <Marker 
            key={stop._id} 
            position={[stop.location.latitude, stop.location.longitude]}
          >
            <Popup>
              <div style={{ minWidth: '150px' }}>
                <h4 style={{ margin: '0 0 8px' }}>{stop.name}</h4>
                <div style={{ fontSize: '0.9em' }}>
                  <div>Latitude: {stop.location.latitude.toFixed(4)}</div>
                  <div>Longitude: {stop.location.longitude.toFixed(4)}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;