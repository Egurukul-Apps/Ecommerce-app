import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavigation from './SideNavigation';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <SideNavigation />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;