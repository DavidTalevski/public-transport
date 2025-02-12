import React, { useEffect, useState } from 'react';
import { apiService } from '../api/api';
import StatCard from '../components/cards/StatCard';
import Map from '../components/map/Map';

const Home = () => {
  const [stats, setStats] = useState({
    cities: 0,
    districts: 0,
    stops: [],
    routes: [],
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
          routes: routesRes.data,
          vehicles,
          dailyPassengers: 16000
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Calculated metrics
  const totalRouteDistance = stats.routes.reduce((acc, route) => acc + (route.distance || 0), 0);
  const averageSpeed = stats.routes.length > 0 ? 
    stats.routes.reduce((acc, route) => acc + (route.averageSpeed || 0), 0) / stats.routes.length : 0;
  const coveragePercentage = (stats.districts / 84) * 100;
  const co2Savings = stats.dailyPassengers * 0.15 * 30;

  // Style constants
  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const cardTitleStyle = { 
    margin: '0 0 15px', 
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const AchievementBadge = ({ icon, title, description, unlocked }) => (
    <div style={{
      minWidth: '160px',
      padding: '15px',
      background: unlocked ? '#f8f9fa' : '#e9ecef',
      borderRadius: '8px',
      textAlign: 'center',
      opacity: unlocked ? 1 : 0.5,
      filter: unlocked ? 'none' : 'grayscale(100%)'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{description}</div>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        🚌 Public Transport Management Dashboard
      </h1>

      {/* Map Section */}
      <div style={cardStyle}>
        <h3 style={{ ...cardTitleStyle, justifyContent: 'center' }}>Transport Network Map</h3>
        <Map stops={stats.stops} routes={stats.routes} />
        <div style={{ 
          marginTop: '10px',
          color: '#7f8c8d',
          fontSize: '0.9em',
          textAlign: 'center'
        }}>
          🎯 {stats.stops.length} stops mapped across North Macedonia
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        margin: '30px 0'
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

        <StatCard title="Transport Network" value={stats.routes.length} color="#e74c3c">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🚏 {stats.stops.length} stops · 👥 {stats.dailyPassengers.toLocaleString()} daily riders
          </div>
        </StatCard>

        <StatCard title="Route Network" value={`${totalRouteDistance.toFixed(0)}km`} color="#9b59b6">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🚀 Avg. speed: {averageSpeed.toFixed(1)}km/h
          </div>
        </StatCard>

        <StatCard title="CO₂ Savings" value={`${(co2Savings/1000).toFixed(0)}t`} color="#27ae60">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🌳 Monthly savings · 🌎 Equivalent to {Math.round(co2Savings/1000 / 2.3)} trees
          </div>
        </StatCard>

        <StatCard title="Network Coverage" value={`${coveragePercentage.toFixed(1)}%`} color="#f1c40f">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🗺️ Covering {stats.districts} of 84 districts
          </div>
        </StatCard>
      </div>

      {/* Lower Panels */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Live Operations */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>🚦 Live Operations</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              flex: 1,
              minWidth: '180px',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#2c3e50' }}>
                {(stats.dailyPassengers/1000).toFixed(1)}k
              </div>
              <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Passengers Today</div>
              <div style={{ color: '#2ecc71', fontSize: '12px' }}>▲ 12% from yesterday</div>
            </div>
            
            <div style={{
              flex: 1,
              minWidth: '180px',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#2c3e50' }}>98.4%</div>
              <div style={{ fontSize: '14px', color: '#7f8c8d' }}>On-Time Performance</div>
              <div style={{ color: '#e74c3c', fontSize: '12px' }}>⏱️ Avg. delay: 2.1min</div>
            </div>
          </div>
        </div>

        {/* Maintenance Alerts */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>🔧 Maintenance Overview</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              borderRadius: '6px',
              background: '#fff3cd',
              color: '#856404'
            }}>
              <span>3 vehicles due for service</span>
              <button style={{
                padding: '6px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                background: 'rgba(0,0,0,0.1)',
                color: 'inherit'
              }}>
                Schedule
              </button>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              borderRadius: '6px',
              background: '#f8d7da',
              color: '#721c24'
            }}>
              <span>1 stop maintenance required</span>
              <button style={{
                padding: '6px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                background: 'rgba(0,0,0,0.1)',
                color: 'inherit'
              }}>
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>🏆 System Achievements</h3>
        <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
          <AchievementBadge 
            icon="🌱" 
            title="Green Milestone" 
            description="Saved 1000t+ CO2" 
            unlocked={co2Savings > 1000000}
          />
          <AchievementBadge
            icon="🚀"
            title="Network Expansion"
            description="Covered 50%+ districts"
            unlocked={coveragePercentage >= 50}
          />
          <AchievementBadge
            icon="💯"
            title="Perfect Service"
            description="99%+ reliability"
            unlocked={stats.vehicles.active / (stats.vehicles.active + stats.vehicles.inactive) > 0.99}
          />
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        marginTop: '30px',
        textAlign: 'center',
        color: '#7f8c8d',
        fontSize: '0.9em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>🕒 Updated: {new Date().toLocaleTimeString()}</div>
        <div>🌍 Serving {stats.dailyPassengers.toLocaleString()} daily commuters</div>
        <div>🚌 {stats.vehicles.active} vehicles in service</div>
      </div>
    </div>
  );
};

export default Home;