'use client';

import React from 'react';
import SalesGraphComponent from './components/SalesGraphComponent/SalesGraphComponent';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
   

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold">Admin Panel Page</h1>
        <p className="mt-4 text-gray-600">Welcome to the admin dashboard.</p>

        {/* Sales Graph */}
        <div className="mt-8">
          <SalesGraphComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
