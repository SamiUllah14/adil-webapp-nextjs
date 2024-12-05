"use client";

import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar Component */}

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold">Admin Panel Page</h1>
        <p className="mt-4 text-gray-600">Welcome to the admin dashboard.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
