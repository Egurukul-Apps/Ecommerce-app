import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import SideNavigation from '../../components/SideNavigation';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SideNavigation />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
