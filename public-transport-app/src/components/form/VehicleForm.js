// VehicleForm.jsx
import React from 'react';

const VehicleForm = ({
  onClose,
  onSubmit,
  formData,
  setFormData,
  cities,
  title = "Add Vehicle"
}) => {
  return (
    <form onSubmit={onSubmit} style={{ padding: '16px', width: '500px' }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '24px',
        color: '#2c3e50',
        textAlign: 'center'
      }}>
        {title}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {/* Add City Selector */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>City</label>
          <select
            value={formData.city_id}
            onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
            style={{ ...inputStyle, padding: '9px' }}
            required
          >
            <option value="">Select a City</option>
            {cities.map(city => (
              <option key={city._id} value={city._id}>{city.name}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>Vehicle Type</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            style={inputStyle}
            required
          />
        </div>

        {/* Plate Number */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>Plate Number</label>
          <input
            type="text"
            value={formData.plateNumber}
            onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
            style={inputStyle}
            required
          />
        </div>

        {/* Manufacturer */}
        <div>
          <label style={labelStyle}>Manufacturer</label>
          <input
            type="text"
            value={formData.manufacturer}
            onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
            style={inputStyle}
            required
          />
        </div>

        {/* Model */}
        <div>
          <label style={labelStyle}>Model</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            style={inputStyle}
            required
          />
        </div>

        {/* Production Year */}
        <div>
          <label style={labelStyle}>Production Year</label>
          <input
            type="number"
            value={formData.productionYear}
            onChange={(e) => setFormData({ ...formData, productionYear: e.target.value })}
            style={inputStyle}
            required
          />
        </div>

        {/* Capacity */}
        <div>
          <label style={labelStyle}>Capacity</label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            style={inputStyle}
            required
          />
        </div>

        {/* Status */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={{ ...inputStyle, padding: '9px' }}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="under maintenance">Under Maintenance</option>
          </select>
        </div>
      </div>
      {/* Full-width button container */}
      <div style={{ gridColumn: 'span 2', width: '100%' }}>
        <button
          type="submit"
          style={{
            ...submitButtonStyle,
            width: '100%',
            padding: '12px 24px',
            fontSize: '16px'
          }}
        >
          {title}
        </button>
      </div>
    </form>
  );
};

// Style constants
const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '500',
  color: '#495057'
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #ced4da',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box'
};

// Updated submit button style
const submitButtonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#218838'
  }
};



export default VehicleForm;