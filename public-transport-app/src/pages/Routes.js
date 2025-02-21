// Routes.jsx (Main Component)
import React, { useEffect, useState } from 'react';
import { apiService } from '../api/api';
import RouteList from '../components/list/RouteList';
import Modal from '../components/Modal';
import RouteForm from '../components/form/RouteForm';

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [newRouteFormData, setNewRouteFormData] = useState({
    name: '',
    stops: [],
    vehicles: []
  });

  const fetchRoutes = async () => {
    try {
      const response = await apiService.getAllRoutes();
      setRoutes(response.data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  const deleteRoute = async (id) => {
    try {
      await apiService.deleteRoute(id);
      fetchRoutes();
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  const handleAddRoute = async (e) => {
    try {
      console.log(newRouteFormData);
      await apiService.createRoute(newRouteFormData.city, newRouteFormData);
      fetchRoutes();
      setIsRouteModalOpen(false);
      setNewRouteFormData({ name: '', stops: [], vehicles: [] });
    } catch (error) {
      console.error('Error adding route:', error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            Manage Routes
          </h1>
          <button
            onClick={() => setIsRouteModalOpen(true)}
            style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Add New Route
          </button>
        </div>

        <div>
          <RouteList 
            routes={routes} 
            onDeleteRoute={deleteRoute}
            onSelectRoute={setSelectedRoute}
          />
        </div>
      </div>

      {isRouteModalOpen && (
        <Modal onClose={() => setIsRouteModalOpen(false)}>
          <RouteForm 
            formData={newRouteFormData}
            setFormData={setNewRouteFormData}
            onSubmit={handleAddRoute}
          />
        </Modal>
      )}
    </div>
  );
};

export default Routes;