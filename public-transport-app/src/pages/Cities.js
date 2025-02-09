import React, { useEffect, useState } from 'react';
import { apiService } from '../api/api';
import CityForm from '../components/CityForm';
import CityList from '../components/CityList';
import AddDistrictForm from '../components/AddDistrictForm';
import Modal from '../components/Modal';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const [districtFormData, setDistrictFormData] = useState({
    name: '',
    population: '',
    area: '',
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
    const result = window.confirm("Are you sure you want to delete this city?");
    if (!result) return;

    try {
      await apiService.deleteCity(id);
      setSelectedCity(null);
      setSelectedDistrict(null);
      fetchCities();
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const deleteDistrict = async (districtId) => {
    if (!selectedCity) return;

    try {
      await apiService.deleteDistrict(districtId);
      fetchCities();
    } catch (error) {
      console.error('Error deleting district:', error);
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
      setIsDistrictModalOpen(false);
      fetchCities();
    } catch (error) {
      console.error('Error adding district:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '32px',
        marginBottom: '32px'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            Manage Cities
          </h1>
          <button 
            onClick={() => setIsCityModalOpen(true)} 
            style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Add City
          </button>
        </div>
        
        <div>
          <CityList
            cities={cities}
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            onSelectCity={setSelectedCity}
            onSelectDistrict={setSelectedDistrict}
            onDeleteCity={deleteCity}
            onAddDistrict={() => setIsDistrictModalOpen(true)}
            onDeleteDistrict={deleteDistrict}
          />
        </div>
      </div>

      {isCityModalOpen && (
        <Modal onClose={() => setIsCityModalOpen(false)}>
          <CityForm fetchCities={fetchCities} />
        </Modal>
      )}

      {isDistrictModalOpen && (
        <Modal onClose={() => setIsDistrictModalOpen(false)}>
          <AddDistrictForm
            formData={districtFormData}
            setFormData={setDistrictFormData}
            onSubmit={handleAddDistrict}
          />
        </Modal>
      )}
    </div>
  );
};

export default Cities;