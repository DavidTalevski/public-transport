import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cities from './pages/Cities';
import Districts from './pages/Districts';
import Stops from './pages/Stops';
import RoutesPage from './pages/Routes';
import StopVisits from './pages/StopVisits';
import Vehicles from './pages/Vehicles';

import './App.css'; // Assuming you add styles here for the navigation bar

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h1>Public Transport Management</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cities">Cities</Link></li>
            <li><Link to="/districts">Districts</Link></li>
            <li><Link to="/stops">Stops</Link></li>
            <li><Link to="/routes">Routes</Link></li>
            <li><Link to="/stop-visits">Stop Visits</Link></li>
            <li><Link to="/vehicles">Vehicles</Link></li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/districts" element={<Districts />} />
            <Route path="/stops" element={<Stops />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/stop-visits" element={<StopVisits />} />
            <Route path="/vehicles" element={<Vehicles />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
