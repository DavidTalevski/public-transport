import React, { useEffect, useState } from 'react';
import { apiService } from '../api/api';
import VehiclesList from '../components/VehiclesList';
import Modal from '../components/Modal';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicleFormData, setNewVehicleFormData] = useState({
    type: '',
    plateNumber: '',
    capacity: '',
    manufacturer: '',
    model: '',
    productionYear: '',
    status: 'active',
  });
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  const fetchVehicles = async () => {
    try {
      const response = await apiService.getVehicles();
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await apiService.deleteVehicle(id);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      const newVehicle = await apiService.addVehicle(newVehicleFormData);
      setVehicles([...vehicles, newVehicle.data]);
      setNewVehicleFormData({
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
    fetchVehicles();
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
          <form onSubmit={handleAddVehicle} style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Number
                </label>
                <input
                  type="text"
                  value={newVehicleFormData.type}
                  onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Plate Number
                </label>
                <input
                  type="text"
                  value={newVehicleFormData.plateNumber}
                  onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, plateNumber: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Capacity
                </label>
                <input
                  type="number"
                  value={newVehicleFormData.capacity}
                  onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, capacity: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Manufacturer
                </label>
                <input
                  type="text"
                  value={newVehicleFormData.manufacturer}
                  onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, manufacturer: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Model
                </label>
                <input
                  type="text"
                  value={newVehicleFormData.model}
                  onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, model: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Production Year
                </label>
                <input
                  type="number"
                  value={newVehicleFormData.productionYear}
                  onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, productionYear: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Status
                </label>
                <select
                  value={newVehicleFormData.status}
                  onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="under maintenance">Under Maintenance</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Add Vehicle
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Vehicles;