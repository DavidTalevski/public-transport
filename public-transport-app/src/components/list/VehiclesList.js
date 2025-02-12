import React, { useState } from 'react';
import VehicleItem from '../item/VehicleItem';

// VehiclesList Component
const VehiclesList = ({
  vehicles,
  onDeleteVehicle,
  onEditVehicle,
  onAddVehicle
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    manufacturer: '',
    model: '',
    plateNumber: '',
    type: '',
    capacity: '',
    productionYear: '',
    status: 'active'
  });

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddVehicle(newVehicle);
    setIsAdding(false);
    setNewVehicle({
      manufacturer: '',
      model: '',
      plateNumber: '',
      type: '',
      capacity: '',
      productionYear: '',
      status: 'active'
    });
  };

  return (
    <div className="vehicle-list-container">

      {isAdding && (
        <form className="add-vehicle-form" onSubmit={handleAddSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Manufacturer*</label>
              <input
                type="text"
                name="manufacturer"
                value={newVehicle.manufacturer}
                onChange={handleAddChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Model*</label>
              <input
                type="text"
                name="model"
                value={newVehicle.model}
                onChange={handleAddChange}
                required
              />
            </div>
            {/* Other form fields same as before */}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn save-btn">Add Vehicle</button>
          </div>
        </form>
      )}

      <div className="vehicle-list">
        {vehicles.map((vehicle) => (
          <VehicleItem
            key={vehicle._id}
            vehicle={vehicle}
            onDeleteVehicle={onDeleteVehicle}
            onEditVehicle={onEditVehicle}
          />
        ))}
      </div>

      <style jsx>{`
        // ... (previous styles remain the same)
      `}</style>
    </div>
  );
};

export default VehiclesList;