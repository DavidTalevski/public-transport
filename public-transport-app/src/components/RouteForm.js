// RouteForm.jsx
import React from 'react';



// tuka treba prvo da odberi grad
// da mu gi izlista site districts so site stops
// da odberi stop, da vnesi vreme i vozilo i so to kje se napraj stop visit
// da mozhi da praj stop visits






const RouteForm = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: '16px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
        {formData._id ? 'Edit Route' : 'Create New Route'}
      </h2>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Route Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ced4da',
            borderRadius: '4px'
          }}
          required
        />
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          width: '100%',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {formData._id ? 'Update Route' : 'Create Route'}
      </button>
    </form>
  );
};

export default RouteForm;