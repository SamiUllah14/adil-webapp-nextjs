"use client";

import { useStaffStore } from "@/app/Services&ZustandState/AdminPanel/Admin/AdminStaffManagement/staffStore";
import React from "react";

export const StaffTable: React.FC = () => {
  const { staff, loading, fetchStaff, deleteStaff } = useStaffStore();

  React.useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  if (loading) return <p className="text-center text-gray-500 p-4">Loading...</p>;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell hidden">Name</th>
            <th className="border-b p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell hidden">Address</th>
            <th className="border-b p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
            <th className="border-b p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell hidden">Role</th>
            <th className="border-b p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {staff.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="p-3 text-sm text-gray-700 sm:table-cell hidden">{member.name}</td>
              <td className="p-3 text-sm text-gray-700 sm:table-cell hidden">{member.address}</td>
              <td className="p-3 text-sm text-gray-700">{member.mobileNumber}</td>
              <td className="p-3 text-sm text-gray-700 sm:table-cell hidden">{member.role}</td>
              <td className="p-3">
                <button
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  onClick={() => deleteStaff(member.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
