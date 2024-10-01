import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from '../Login';
import Services from '../Deposit';
import Progress from '../Progress';
import Gallery from '../Gallery';
import Loan from '../Loan';
import Others from '../Others';
import Origin from '../Origin';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import './sidebar.css';  // Import the CSS file
import Bot from '../Bot';
import Member from '../Member/Table'

// Import the profile picture
import ProfilePicture from '../App/image-2.png'; // Adjust the path to the correct location

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem('is_authenticated', JSON.stringify(status));
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <div className="sidebar-container">
            <Sidebar>
              <div className="profile-picture-container">
                <img src={ProfilePicture} alt="Profile" className="profile-picture" />
              </div>
              <Menu className="menu-item">
                <MenuItem className="sidebar-menu-item" component={<Link to="/Deposit" />}>
                  Deposit
                </MenuItem>
                <MenuItem className="sidebar-menu-item" component={<Link to="/Loan" />}>
                  Loan
                </MenuItem>
                 <MenuItem className="sidebar-menu-item" component={<Link to="/Others" />}>
                  Others
                </MenuItem>
                <MenuItem className="sidebar-menu-item" component={<Link to="/Origin" />}>
                  Origin
                </MenuItem>
                <MenuItem className="sidebar-menu-item" component={<Link to="/progress" />}>
                  Progress
                </MenuItem>
                <MenuItem className="sidebar-menu-item" component={<Link to="/member" />}>
                 Members
                </MenuItem>
                <MenuItem className="sidebar-menu-item" component={<Link to="/Gallery" />}>
                  Gallery
                </MenuItem>
                <MenuItem className="sidebar-menu-item" component={<Link to="/Bot" />}>
                 Assistant Bot
                </MenuItem>
                
              </Menu>
            </Sidebar>
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/Deposit" element={<Services setIsAuthenticated={handleAuthentication} />} />
              <Route path="/Progress" element={<Progress setIsAuthenticated={handleAuthentication} />} />
              <Route path="/Gallery" element={<Gallery setIsAuthenticated={handleAuthentication} />} />
              <Route path="/Others" element={<Others setIsAuthenticated={handleAuthentication} />} />
              <Route path="/Loan" element={<Loan setIsAuthenticated={handleAuthentication} />} />
              <Route path="/Origin" element={<Origin setIsAuthenticated={handleAuthentication} />} />
              <Route path="/Bot" element={<Bot setIsAuthenticated={handleAuthentication} />} />
              <Route path="/member" element={<Member setIsAuthenticated={handleAuthentication} />} />
              <Route path="/" element={<Services setIsAuthenticated={handleAuthentication} />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login setIsAuthenticated={handleAuthentication} />
      )}
    </Router>
  );
};

export default App;
