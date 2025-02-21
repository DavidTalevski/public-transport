import React, { useEffect, useState } from 'react';
import { apiService } from '../api/api';
import StatCard from '../components/cards/StatCard';
import Map from '../components/map/Map';
import CitySelector from '../components/CitySelector'; // New component
import AchievementBadge from '../components/AchievementBadge';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [stats, setStats] = useState({
    districts: [],
    stops: [],
    routes: [],
    vehicles: { active: 0, inactive: 0, maintenance: 0 },
    co2Savings: 0,
    dailyPassengers: 0
  });

  // Fetch list of cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await apiService.getCities();
        setCities(response.data);
        if (response.data.length > 0) {
          setSelectedCity(response.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  // Fetch city-specific data
  useEffect(() => {
    const fetchCityData = async () => {
      if (!selectedCity) return;

      try {
        const [
          districtsRes,
          stopsRes,
          routesRes,
          vehiclesRes
        ] = await Promise.all([
          apiService.getCityDistricts(selectedCity),
          apiService.getCityStops(selectedCity),
          apiService.getCityRoutes(selectedCity),
          apiService.getCityVehicles(selectedCity)
        ]);

        const vehicles = vehiclesRes.data.reduce((acc, vehicle) => {
          acc[vehicle.status === 'under maintenance' ? 'maintenance' : vehicle.status] += 1;
          return acc;
        }, { active: 0, inactive: 0, maintenance: 0 });

        const passengerCapacity = vehiclesRes.data.reduce((acc, vehicle) => acc += vehicle.capacity, 0);

        setStats({
          districts: districtsRes.data,
          stops: stopsRes.data,
          routes: routesRes.data,
          vehicles,
          co2Savings: calculateCO2Savings(passengerCapacity),
          dailyPassengers: 16000 // This should come from backend
        });
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCityData();
    const interval = setInterval(fetchCityData, 300000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  function calculateCO2Savings(passengers) {
    if (passengers <= 0) return 0;

    const tripsPerDay = 10;
    const daysPerMonth = 30;
    const carEmissions = 120;
    const busEmissions = 900;
    const passengersPerCar = 1.5;
    const distance = 2
    // CO₂ emissions per trip (grams)
    let co2ByCarPerTrip = (distance * carEmissions * passengers) / passengersPerCar;
    let co2ByBusPerTrip = distance * busEmissions;

    // Convert to kg
    let co2ByCarPerTripKg = co2ByCarPerTrip / 1000;
    let co2ByBusPerTripKg = co2ByBusPerTrip / 1000;

    // CO₂ savings per trip
    let co2SavingsPerTrip = co2ByCarPerTripKg - co2ByBusPerTripKg;

    // Calculate total monthly CO₂ savings
    let co2SavingsMonthly = co2SavingsPerTrip * tripsPerDay * daysPerMonth;

    // Convert CO₂ savings to trees equivalent

    return co2SavingsMonthly;
  }

  function calculateCoveragePercentage(districts, routes) {
    const totalDistricts = districts.length;
    if (totalDistricts === 0) return 0;

    // Collect all stop IDs used in routes
    const activeStopIds = new Set(routes.flatMap(route => route.stops.map(stop => stop._id)));

    // Count districts with at least one active stop
    const coveredDistricts = districts.filter(district => district.stops.some(stop => activeStopIds.has(stop))).length;

    // Calculate percentage
    return (coveredDistricts / totalDistricts) * 100;
  }

  const coveragePercentage = calculateCoveragePercentage(stats.districts, stats.routes);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '0', }}>
          Public Transport Dashboard
        </h1>
      </div>

      {/* Map Section */}
      <div style={cardStyle}>
        
      <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          style={{ padding: '8px', borderRadius: '4px', fontSize: '16px' }} // Added styling to the CitySelector for consistency
        />
        <h3 style={{ ...cardTitleStyle, justifyContent: 'center', marginTop: '15px', marginBottom: '15px' }}>
          {selectedCity ? cities.find(c => c._id === selectedCity)?.name : 'Select a City'} Transport Network
        </h3>

        <Map stops={stats.stops} routes={stats.routes} />

        <div style={mapFooterStyle}>
          🎯 {stats.stops.length} stops mapped across selected city
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        margin: '30px 0'
      }}>
        <StatCard title="Cities" value={cities.length} color="#3498db">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🌆 {stats.districts.length} districts total
          </div>
        </StatCard>

        <StatCard title="Active Vehicles" value={stats.vehicles.active} color="#2ecc71">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🚦 {stats.vehicles.inactive} inactive 🔧 {stats.vehicles.maintenance} maint.
          </div>
        </StatCard>

        <StatCard title="Transport Network" value={stats.routes.length} color="#e74c3c">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🚏 {stats.stops.length} stops 👥 {`${selectedCity ? (cities.find(c => c._id === selectedCity)?.population / 1000).toFixed(0) : 0}`}k residents
          </div>
        </StatCard>

        <StatCard title="Area Coverage" value={`${selectedCity ? cities.find(c => c._id === selectedCity)?.area.toFixed(0) : 0}km²`} color="#9b59b6">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🗺️ Avg district area: {(stats.districts.reduce((sum, district) => sum + district.area, 0) / stats.districts.length).toFixed(0)} km²

          </div>
        </StatCard>

        <StatCard title="CO₂ Savings" value={`${(stats.co2Savings / 1000).toFixed(0)}t`} color="#27ae60">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🌎 Monthly savings<br /> 🌳 Equivalent to {Math.round(stats.co2Savings / 22)} trees
          </div>
        </StatCard>

        <StatCard title="Network Coverage" value={`${coveragePercentage.toFixed(1)}%`} color="#f1c40f">
          <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
            🗺️ Covering {stats.districts.filter(district =>
              district.stops.some(stop => stats.routes.flatMap(route => route.stops).some(rStop => rStop._id === stop))
            ).length} of {stats.districts.length} districts
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
          <h3 style={cardTitleStyle}>🚦 Live Operations ❌ Not Available</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              flex: 1,
              minWidth: '180px',
              padding: '15px',
              background: '#e0e0e0', // Gray background
              borderRadius: '8px',
              textAlign: 'center',
              opacity: 0.6, // Reduces opacity to gray out the element
            }}>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#7f8c8d' }}>
                {(stats.dailyPassengers / 1000).toFixed(1)}k
              </div>
              <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Passengers Today</div>
              <div style={{ color: '#7f8c8d', fontSize: '12px' }}>▲ 12% from yesterday</div>
            </div>

            <div style={{
              flex: 1,
              minWidth: '180px',
              padding: '15px',
              background: '#e0e0e0', // Gray background
              borderRadius: '8px',
              textAlign: 'center',
              opacity: 0.6, // Reduces opacity to gray out the element
            }}>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#7f8c8d' }}>98.4%</div>
              <div style={{ fontSize: '14px', color: '#7f8c8d' }}>On-Time Performance</div>
              <div style={{ color: '#7f8c8d', fontSize: '12px' }}>⏱️ Avg. delay: 2.1min</div>
            </div>
          </div>
        </div>


        {/* Maintenance Alerts */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>🔧 Maintenance Overview</h3>

          {/* If there are no vehicles requiring maintenance or inactive, show a green "everything is fine" message */}
          {stats.vehicles.maintenance === 0 && stats.vehicles.inactive === 0 ? (
            <div style={{
              padding: '12px',
              borderRadius: '6px',
              background: '#d4edda',
              color: '#155724',
              textAlign: 'center'
            }}>
              No actions needed!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Show Inactive Vehicles Card if there are inactive vehicles */}
              {stats.vehicles.inactive > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '6px',
                  background: '#fff3cd',
                  color: '#856404'
                }}>
                  <span>{stats.vehicles.inactive} vehicles are inactive</span>
                  <button
                    onClick={() => window.location.href = '/vehicles'}
                    style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: 'rgba(0,0,0,0.1)',
                      color: 'inherit'
                    }}
                  >
                    Schedule
                  </button>
                </div>
              )}

              {/* Show Maintenance Vehicles Card if there are vehicles needing maintenance */}
              {stats.vehicles.maintenance > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '6px',
                  background: '#f8d7da',
                  color: '#721c24'
                }}>
                  <span>{stats.vehicles.maintenance} vehicles require maintenance</span>
                  <button
                    onClick={() => window.location.href = '/vehicles'}
                    style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: 'rgba(0,0,0,0.1)',
                      color: 'inherit'
                    }}
                  >
                    View
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>


      {/* Achievements */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>🏆 City Achievements</h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center', // Centers the items horizontally
          alignItems: 'center', // Centers the items vertically
          gap: '15px',
          overflowX: 'auto',
          paddingBottom: '10px',
          flexWrap: 'wrap', // Allows wrapping of badges if the screen size is small
        }}>
          <AchievementBadge
            icon="🌱"
            title="Green Milestone"
            description="Saved 1000t+ CO2"
            unlocked={stats.co2Savings > 1000000}
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
          <AchievementBadge
            icon="🚗"
            title="Fleet Growth"
            description="30+ active vehicles"
            unlocked={stats.vehicles.active >= 30}
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

        {/* Added transportation emoji to the second div */}
        <div>🚍 Public Transport</div>

        {/* Added copyright and globe emojis to the third div */}
        <div>© {new Date().getFullYear()}  All Rights Reserved</div>

      </div>
    </div>
  );
};

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

const mapFooterStyle = {
  marginTop: '10px',
  color: '#7f8c8d',
  fontSize: '0.9em',
  textAlign: 'center'
};


export default Home;