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
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Add New District</h3>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="District name"
          className="p-2 border rounded"
          required
        />
        <input
          name="population"
          type="number"
          value={formData.population}
          onChange={handleChange}
          placeholder="Population"
          className="p-2 border rounded"
          required
        />
        <input
          name="area"
          type="number"
          step="0.1"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area (km²)"
          className="p-2 border rounded"
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Latitude"
            className="p-2 border rounded"
            required
          />
          <input
            name="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Longitude"
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add District
        </button>
      </form>
    </div>
  );
};

export default AddDistrictForm;