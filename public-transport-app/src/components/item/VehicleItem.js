import React, { useState } from 'react';
import { apiService } from '../../api/api';

// VehicleItem Component
const VehicleItem = ({ vehicle, onDeleteVehicle, onEditVehicle }) => {  
  const [localStatus, setLocalStatus] = useState(vehicle.status);

  const statusStyles = {
    active: { backgroundColor: '#d4edda', color: '#155724' },
    inactive: { backgroundColor: '#fff3cd', color: '#856404' },
    'under maintenance': { backgroundColor: '#f8d7da', color: '#721c24' }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      // Update local state immediately for instant visual feedback
      setLocalStatus(newStatus);
      
      // Send API request
      await apiService.updateVehicleStatus(vehicle._id, newStatus);
      
      // Update parent component state
      onEditVehicle({ ...vehicle, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
      // Revert to previous status if API call fails
      setLocalStatus(vehicle.status);
    }
  };

  return (
    <div className="vehicle-card">
      <div className="vehicle-header">
        <h3>{vehicle.manufacturer} {vehicle.model}</h3>
        <div className="status-selector">
          <select
            value={localStatus}
            onChange={handleStatusChange}
            style={statusStyles[vehicle.status]}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="under maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <div className="vehicle-details-grid">
        <div className="detail-item">
          <label>Plate Number:</label>
          <span>{vehicle.plateNumber}</span>
        </div>
        <div className="detail-item">
          <label>Number:</label>
          <span>{vehicle.type}</span>
        </div>
        <div className="detail-item">
          <label>Capacity:</label>
          <span>{vehicle.capacity} persons</span>
        </div>
        <div className="detail-item">
          <label>Production Year:</label>
          <span>{vehicle.productionYear}</span>
        </div>
      </div>

      <div className="vehicle-actions">
        <button
          className="btn delete-btn"
          onClick={() => onDeleteVehicle(vehicle._id)}
        >
          Delete Vehicle
        </button>
      </div>

      <style jsx>{`
          .vehicle-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
  
          .vehicle-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          }
  
          h3 {
            margin: 0;
            color: #2c3e50;
            font-size: 1.2rem;
          }
  
          .status-selector select {
            padding: 6px 12px;
            border-radius: 15px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          }
  
          .status-active {
            background: #d4edda;
            color: #155724;
          }
  
          .status-inactive {
            background: #fff3cd;
            color: #856404;
          }
  
          .status-under-maintenance {
            background: #f8d7da;
            color: #721c24;
          }
  
          .vehicle-details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 15px;
          }
  
          .detail-item {
            display: flex;
            flex-direction: column;
            padding: 8px;
            background: #f8f9fa;
            border-radius: 4px;
          }
  
          .detail-item label {
            font-size: 0.9rem;
            color: #6c757d;
            margin-bottom: 4px;
          }
  
          .detail-item span {
            font-weight: 500;
            color: #495057;
          }
  
          .vehicle-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
          }
  
  
  
          .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
          }
  
  
          .delete-btn {
            background: #dc3545;
            color: white;
          }
  
          .save-btn {
            background: #28a745;
            color: white;
          }
  
          .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
          }
  
          .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ced4da;
            border-radius: 4px;
          }
        `}</style>
    </div>
  );
};

export default VehicleItem;
