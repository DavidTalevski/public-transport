import React, { useEffect, useState } from 'react';
import { apiService } from '../api/api'; // Centralized API service
import CityForm from '../components/CityForm';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null); // Track selected district for managing stops
  const [districtName, setDistrictName] = useState('');
  const [districtPopulation, setDistrictPopulation] = useState('');
  const [districtArea, setDistrictArea] = useState('');
  const [districtLatitude, setDistrictLatitude] = useState('');
  const [districtLongitude, setDistrictLongitude] = useState('');
  const [stopName, setStopName] = useState('');
  const [stopLatitude, setStopLatitude] = useState('');
  const [stopLongitude, setStopLongitude] = useState('');

  const fetchCities = async () => {
    try {
      const response = await apiService.getCities();
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const deleteCity = async (id) => {
    try {
      await apiService.deleteCity(id);
      fetchCities();
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const addDistrict = async () => {
    if (!selectedCity) {
      alert('Please select a city first.');
      return;
    }

    try {
      await apiService.addDistrictToCity(selectedCity._id, {
        name: districtName,
        population: parseInt(districtPopulation, 10),
        area: parseFloat(districtArea),
        coordinates: {
          latitude: parseFloat(districtLatitude),
          longitude: parseFloat(districtLongitude),
        },
      });

      // Clear district form and refresh data
      setDistrictName('');
      setDistrictPopulation('');
      setDistrictArea('');
      setDistrictLatitude('');
      setDistrictLongitude('');
      fetchCities();
    } catch (error) {
      console.error('Error adding district:', error);
    }
  };

  const addStop = async () => {
    if (!selectedDistrict) {
      alert('Please select a district first.');
      return;
    }

    try {
      await apiService.addStopToDistrict(selectedDistrict._id, {
        name: stopName,
        location: {
          latitude: parseFloat(stopLatitude),
          longitude: parseFloat(stopLongitude),
        },
      });

      // Clear stop form and refresh data
      setStopName('');
      setStopLatitude('');
      setStopLongitude('');
      fetchCities();
    } catch (error) {
      console.error('Error adding stop:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="cities-container">
      <div className="form-container">
        <CityForm fetchCities={fetchCities} />
      </div>
      <div className="list-container">
        <h2>List of Cities</h2>
        <ul className="cities-list">
          {cities.map((city) => (
            <li key={city._id} className="city-item">
              <div>
                <strong>{city.name}</strong> ({city.country}) - Population: {city.population}, Area: {city.area} sq km
                <ul className="districts-list">
                  {city.districts.map((district) => (
                    <li key={district._id} className="district-item">
                      {district.name} - Population: {district.population}, Area: {district.area} sq km
                      <button
                        onClick={() => setSelectedDistrict(district)}
                        className={`select-button ${
                          selectedDistrict && selectedDistrict._id === district._id ? 'selected' : ''
                        }`}
                      >
                        Manage Stops
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => deleteCity(city._id)} className="delete-button">
                Delete
              </button>
              <button
                onClick={() => setSelectedCity(city)}
                className={`select-button ${selectedCity && selectedCity._id === city._id ? 'selected' : ''}`}
              >
                Select City
              </button>
            </li>
          ))}
        </ul>
        {selectedCity && (
          <div className="district-form">
            <h3>Add District to City: {selectedCity.name}</h3>
            <div className="form-group">
              <label htmlFor="districtName">Name:</label>
              <input
                id="districtName"
                type="text"
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="districtPopulation">Population:</label>
              <input
                id="districtPopulation"
                type="number"
                value={districtPopulation}
                onChange={(e) => setDistrictPopulation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="districtArea">Area:</label>
              <input
                id="districtArea"
                type="number"
                value={districtArea}
                onChange={(e) => setDistrictArea(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="districtLatitude">Latitude:</label>
              <input
                id="districtLatitude"
                type="number"
                value={districtLatitude}
                onChange={(e) => setDistrictLatitude(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="districtLongitude">Longitude:</label>
              <input
                id="districtLongitude"
                type="number"
                value={districtLongitude}
                onChange={(e) => setDistrictLongitude(e.target.value)}
              />
            </div>
            <button onClick={addDistrict} className="add-button">
              Add District
            </button>
          </div>
        )}
        {selectedDistrict && (
          <div className="stop-form">
            <h3>Add Stop to District: {selectedDistrict.name}</h3>
            <div className="form-group">
              <label htmlFor="stopName">Stop Name:</label>
              <input
                id="stopName"
                type="text"
                value={stopName}
                onChange={(e) => setStopName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stopLatitude">Latitude:</label>
              <input
                id="stopLatitude"
                type="number"
                value={stopLatitude}
                onChange={(e) => setStopLatitude(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stopLongitude">Longitude:</label>
              <input
                id="stopLongitude"
                type="number"
                value={stopLongitude}
                onChange={(e) => setStopLongitude(e.target.value)}
              />
            </div>
            <button onClick={addStop} className="add-button">
              Add Stop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cities;
