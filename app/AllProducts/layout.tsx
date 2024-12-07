// app/admin/layout.tsx (Admin Layout)
import React from "react";
import AllProductSideBar from "./components/AllProductSideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <AllProductSideBar/>
        <main className="flex-1 bg-gray-100">{children}</main> {/* Page-specific content */}
      </div>
    </div>
  );
}
