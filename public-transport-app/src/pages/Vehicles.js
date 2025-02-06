// Vehicles.jsx
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

  // Fetch vehicles from the API
  const fetchVehicles = async () => {
    try {
      const response = await apiService.getVehicles();
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  // Delete a vehicle
  const deleteVehicle = async (id) => {
    try {
      await apiService.deleteVehicle(id);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  // Add a new vehicle
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Vehicles</h1>
      <button
        onClick={() => setIsVehicleModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Add New Vehicle
      </button>

      <VehiclesList vehicles={vehicles} onDeleteVehicle={deleteVehicle} />

      {isVehicleModalOpen && (
        <Modal onClose={() => setIsVehicleModalOpen(false)}>
          <form onSubmit={handleAddVehicle}>

            <label className="block mb-2">Type</label>
            <input
              type="text"
              value={newVehicleFormData.type}
              onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, type: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Plate Number</label>
            <input
              type="text"
              value={newVehicleFormData.plateNumber}
              onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, plateNumber: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Capacity</label>
            <input
              type="number"
              value={newVehicleFormData.capacity}
              onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, capacity: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Manufacturer</label>
            <input
              type="text"
              value={newVehicleFormData.manufacturer}
              onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, manufacturer: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Model</label>
            <input
              type="text"
              value={newVehicleFormData.model}
              onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, model: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Production Year</label>
            <input
              type="number"
              value={newVehicleFormData.productionYear}
              onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, productionYear: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Status</label>
            <select
              value={newVehicleFormData.status}
              onChange={(e) => setNewVehicleFormData({ ...newVehicleFormData, status: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="under maintenance">Under Maintenance</option>
            </select>

            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
              Add Vehicle
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Vehicles;
