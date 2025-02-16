// Vehicles.jsx
import React, { useEffect, useState } from 'react';
import { apiService } from '../api/api';
import VehiclesList from '../components/list/VehiclesList';
import Modal from '../components/Modal';
import VehicleForm from '../components/form/VehicleForm';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [cities, setCities] = useState([]); // Add cities state
  const [newVehicleFormData, setNewVehicleFormData] = useState({
    city_id: '', // Add city_id to form data
    type: '',
    plateNumber: '',
    capacity: '',
    manufacturer: '',
    model: '',
    productionYear: '',
    status: 'active',
  });
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // Fetch both vehicles and cities
  const fetchData = async () => {
    try {
      const [vehiclesRes, citiesRes] = await Promise.all([
        apiService.getAllVehicles(),
        apiService.getCities()
      ]);
      setVehicles(vehiclesRes.data);
      setCities(citiesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await apiService.deleteVehicle(id);
      // Update state
      const updatedVehicles = vehicles.filter(v => v._id !== id);
      setVehicles(updatedVehicles);

    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      // Destructure city_id from form data
      const { city_id, ...vehicleData } = newVehicleFormData;
      const response = await apiService.createVehicle(city_id, vehicleData);
      
      setVehicles([...vehicles, response.data]);
      setNewVehicleFormData({
        city_id: '',
        type: '',
        plateNumber: '',
        capacity: '',
        manufacturer: '',
        model: '',
        productionYear: '',
        status: 'active',
      });
      setIsVehicleModalOpen(false);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  useEffect(() => {
    fetchData();
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
            Manage Vehicles
          </h1>
          <button
            onClick={() => setIsVehicleModalOpen(true)}
            style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Add New Vehicle
          </button>
        </div>

        <div>
          <VehiclesList
            vehicles={vehicles}
            cities={cities}
            onDeleteVehicle={deleteVehicle}
            onEditVehicle={(updatedVehicle) => {
              setVehicles(prev => prev.map(v =>
                v._id === updatedVehicle._id ? updatedVehicle : v
              ));
            }}
          />
        </div>
      </div>

      {isVehicleModalOpen && (
        <Modal onClose={() => setIsVehicleModalOpen(false)}>
          <VehicleForm
            cities={cities}
            onClose={() => setIsVehicleModalOpen(false)}
            onSubmit={handleAddVehicle}
            formData={newVehicleFormData}
            setFormData={setNewVehicleFormData}
            title="Add New Vehicle"
          />
        </Modal>
      )}
    </div>
  );
};

export default Vehicles;