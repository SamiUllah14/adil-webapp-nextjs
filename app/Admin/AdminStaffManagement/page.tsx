import React from "react";
import { StaffFormModal } from "../components/StaffTable/StaffFormModal";
import { StaffTable } from "../components/StaffTable/StaffTable";

const AdminPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Staff Management</h1>
      <StaffFormModal />
      <div className="mt-8">
        <StaffTable />
      </div>
    </div>
  );
};

export default AdminPage;
