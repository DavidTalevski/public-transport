import React, { useEffect, useState } from 'react';
import { apiService } from '../api/api';
import StatCard from '../components/cards/StatCard';
import Map from '../components/map/Map';


const Home = () => {
  const [stats, setStats] = useState({
    cities: 0,
    districts: 0,
    stops: [],
    routes: 0,
    vehicles: { active: 0, inactive: 0, maintenance: 0 },
    dailyPassengers: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, districtsRes, stopsRes, routesRes, vehiclesRes] = await Promise.all([
          apiService.getCities(),
          apiService.getDistricts(),
          apiService.getStops(),
          apiService.getRoutes(),
          apiService.getVehicles()
        ]);

        const vehicles = vehiclesRes.data.reduce((acc, vehicle) => {
          acc[vehicle.status === 'under maintenance' ? 'maintenance' : vehicle.status] += 1;
          return acc;
        }, { active: 0, inactive: 0, maintenance: 0 });

        setStats({
          cities: citiesRes.data.length,
          districts: districtsRes.data.length,
          stops: stopsRes.data,
          routes: routesRes.data.length,
          vehicles,
          dailyPassengers: 16000
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        🚌 Public Transport Management Dashboard
      </h1>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h3 style={{ margin: '0 0 15px', color: '#666', textAlign:"center" }}>Transport Network Map</h3>
          <Map stops={stats.stops} />
          <div style={{ 
            marginTop: '10px',
            color: '#7f8c8d',
            fontSize: '0.9em',
            textAlign: 'center'
          }}>
            🎯 {stats.stops.length} stops mapped across North Macedonia
          </div>
        </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard title="Cities" value={stats.cities} color="#3498db">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🌆 {stats.districts} districts total
          </div>
        </StatCard>

        <StatCard title="Active Vehicles" value={stats.vehicles.active} color="#2ecc71">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🚦 {stats.vehicles.inactive} inactive · 🔧 {stats.vehicles.maintenance}
          </div>
        </StatCard>

        <StatCard title="Transport Network" value={stats.routes} color="#e74c3c">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🚏 {stats.stops.length} stops · 👥 {stats.dailyPassengers.toLocaleString()} daily riders
          </div>
        </StatCard>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        {/* Vehicle Status Chart */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px', color: '#666' }}>Vehicle Status Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(stats.vehicles).map(([status, count]) => (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: `${(count / (stats.vehicles.active + stats.vehicles.inactive + stats.vehicles.maintenance)) * 100}%`,
                  height: '30px',
                  background: status === 'active' ? '#2ecc71' : status === 'inactive' ? '#f1c40f' : '#e74c3c',
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }} />
                <span style={{ textTransform: 'capitalize', minWidth: '100px' }}>
                  {status} ({count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px', color: '#666' }}>System Health</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '60px', fontWeight: 'bold' }}>🚌 Routes</div>
              <div style={{
                flexGrow: 1,
                height: '20px',
                background: '#ecf0f1',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(stats.routes / Math.max(stats.cities * 2, 1)) * 100}%`,
                  height: '100%',
                  background: '#9b59b6',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '60px', fontWeight: 'bold' }}>🚏 Stops</div>
              <div style={{
                flexGrow: 1,
                height: '20px',
                background: '#ecf0f1',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(stats.stops.length / Math.max(stats.districts * 5, 1)) * 100}%`,
                  height: '100%',
                  background: '#e67e22',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '30px',
        textAlign: 'center',
        color: '#7f8c8d',
        fontSize: '0.9em'
      }}>
        🕒 Updated in real-time · 📊 Data-driven insights · 🌍 Serving the community
      </div>
    </div>
  );
};

export default Home;