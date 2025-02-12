import React from 'react';

const DistrictForm = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: '16px' }}>
      <h2 style={{ 
        fontSize: '24px',
        fontWeight: 600,
        marginBottom: '24px'
      }}>
        Add New District
      </h2>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>District Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="District name"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Population:</label>
        <input
          name="population"
          type="number"
          value={formData.population}
          onChange={handleChange}
          placeholder="Population"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Area (sq km):</label>
        <input
          name="area"
          type="number"
          step="0.1"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area (km²)"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%'
          }}
          required
        />
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Latitude:</label>
          <input
            name="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Latitude"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Longitude:</label>
          <input
            name="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Longitude"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          width: '100%',
          marginTop: '16px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Add District
      </button>
    </form>
  );
};

export default DistrictForm;