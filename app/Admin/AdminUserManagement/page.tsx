"use client";

import React, { useEffect } from "react";
import EmployeeTable from "../components/DataTable/EmployeeTable";
import useAdminUserManagementStore from "@/app/Services&ZustandState/AdminPanel/Admin/AdminUserManagementStore/AdminUserManagementStore";

// Define the Employee type if not imported
interface Employee {
  id: number;
  name: string;
  address: string;
  mobileNumber: string;
  passwordHash: string;
}

const Page = () => {
  const { employees, loading, fetchEmployees, deleteEmployee, updateEmployee } =
    useAdminUserManagementStore();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
  };

  const handleEdit = (id: number, updatedData: Partial<Employee>) => {
    updateEmployee(id, updatedData);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col lg:flex-row">
      <div className="flex flex-col lg:items-start items-center justify-center h-full">
        <div className="text-center text-2xl sm:text-3xl font-bold mb-4">
          User Management
        </div>
        <div className="text-center text-lg sm:text-xl font-bold">
          Users Data
        </div>
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <EmployeeTable
            employees={employees}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
