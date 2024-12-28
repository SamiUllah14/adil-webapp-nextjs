'use client';

import React from "react";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import useLoginStore from "../Services&ZustandState/Authentication/LoginStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useLoginStore(); // Get role from Zustand store

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Conditionally render the sidebar */}
        {role === "Admin" && <AdminSidebar />}

        <main className="flex-1 bg-gray-100">{children}</main> {/* Page-specific content */}
      </div>
    </div>
  );
}
