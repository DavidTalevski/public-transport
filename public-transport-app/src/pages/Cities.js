// Cities.jsx
import React, { useEffect, useState } from 'react';
import { apiService } from '../api/api';
import CityForm from '../components/CityForm';
import CityList from '../components/CityList';
import AddDistrictForm from '../components/AddDistrictForm';
import AddStopForm from '../components/AddStopForm';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtFormData, setDistrictFormData] = useState({
    name: '',
    population: '',
    area: '',
    latitude: '',
    longitude: ''
  });
  const [stopFormData, setStopFormData] = useState({
    name: '',
    latitude: '',
    longitude: ''
  });

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
      setSelectedCity(null);
      setSelectedDistrict(null);
      fetchCities();
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const handleAddDistrict = async (e) => {
    e.preventDefault();
    if (!selectedCity) return;

    try {
      await apiService.addDistrictToCity(selectedCity._id, {
        ...districtFormData,
        population: parseInt(districtFormData.population, 10),
        area: parseFloat(districtFormData.area),
        coordinates: {
          latitude: parseFloat(districtFormData.latitude),
          longitude: parseFloat(districtFormData.longitude),
        }
      });
      setDistrictFormData({
        name: '',
        population: '',
        area: '',
        latitude: '',
        longitude: ''
      });
      fetchCities();
    } catch (error) {
      console.error('Error adding district:', error);
    }
  };

  const handleAddStop = async (e) => {
    e.preventDefault();
    if (!selectedDistrict) return;

    try {
      await apiService.addStopToDistrict(selectedDistrict._id, {
        name: stopFormData.name,
        location: {
          latitude: parseFloat(stopFormData.latitude),
          longitude: parseFloat(stopFormData.longitude),
        }
      });
      setStopFormData({
        name: '',
        latitude: '',
        longitude: ''
      });
      fetchCities();
    } catch (error) {
      console.error('Error adding stop:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">Manage Cities</h1>
          <CityForm fetchCities={fetchCities} />
        </div>
        
        <div>
          <CityList
            cities={cities}
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            onSelectCity={setSelectedCity}
            onSelectDistrict={setSelectedDistrict}
            onDeleteCity={deleteCity}
          />

          {selectedCity && (
            <AddDistrictForm
              formData={districtFormData}
              setFormData={setDistrictFormData}
              onSubmit={handleAddDistrict}
            />
          )}

          {selectedDistrict && (
            <AddStopForm
              formData={stopFormData}
              setFormData={setStopFormData}
              onSubmit={handleAddStop}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cities;