// AddDistrictForm.jsx
import React from 'react';

const AddDistrictForm = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={onSubmit} className="city-form">
      <h2 className="text-2xl font-semibold mb-6">Add New District</h2>

      <div className="form-group">
        <label htmlFor="name">District Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="District name"
          className="p-2 border rounded w-full"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="population">Population:</label>
        <input
          name="population"
          type="number"
          value={formData.population}
          onChange={handleChange}
          placeholder="Population"
          className="p-2 border rounded w-full"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="area">Area (sq km):</label>
        <input
          name="area"
          type="number"
          step="0.1"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area (km²)"
          className="p-2 border rounded w-full"
          required
        />
      </div>

      <div className="form-group grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="latitude">Latitude:</label>
          <input
            name="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Latitude"
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude:</label>
          <input
            name="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Longitude"
            className="p-2 border rounded w-full"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mt-4"
      >
        Add District
      </button>
    </form>
  );
};

export default AddDistrictForm;
