'use client';

import React from 'react';
import SalesGraphComponent from './components/SalesGraphComponent/SalesGraphComponent';
import useAdminProtection from '../components/AdminProtectedRoute/useAdminProtection';
import useLoginStore from '../Services&ZustandState/Authentication/LoginStore';
import UnAuthPerson from '../components/UnAuthPerson/unAuthPerson';

const AdminDashboard: React.FC = () => {
  const { role } = useLoginStore();
  useAdminProtection(); // Protect the page

  if (role === null) {
    return <UnAuthPerson/>; // Wait for role to be determined
  }

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
