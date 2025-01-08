"use client";

import React, { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";
import SalesGraphComponent from "./components/SalesGraphComponent/SalesGraphComponent";
import useAdminProtection from "../components/AdminProtectedRoute/useAdminProtection";
import useLoginStore from "../Services&ZustandState/Authentication/LoginStore";
import UnAuthPerson from "../components/UnAuthPerson/unAuthPerson";

const AdminDashboard: React.FC = () => {
  const { role } = useLoginStore();
  const [notifications, setNotifications] = useState<string[]>([]);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useAdminProtection(); // Protect the page

  useEffect(() => {
    const connectToSignalR = async () => {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5151/notificationHub") // Adjust this URL to match your backend
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      try {
        await conn.start();
        console.log("Connected to SignalR hub.");

        // Listen for notifications from the backend
        conn.on("ReceiveMessage", (message: string) => {
          console.log("Notification received:", message);

          // Update notifications state
          setNotifications((prev) => [...prev, message]);
        });

        setConnection(conn);
      } catch (error) {
        console.error("SignalR connection failed:", error);
      }
    };

    connectToSignalR();

    // Cleanup on component unmount
    return () => {
      if (connection) {
        connection.stop();
        console.log("SignalR connection stopped.");
      }
    };
  }, [connection]);

  if (role === null) {
    return <UnAuthPerson />; // Wait for role to be determined
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Admin Panel
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Welcome to the admin dashboard. Manage and monitor your application
          effectively.
        </p>

        {/* Notifications */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Real-Time Notifications
          </h2>
          <ul className="mt-4 list-disc pl-5 space-y-2">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="text-gray-700 bg-gray-100 p-3 rounded-md"
                >
                  {notification}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No notifications yet.</p>
            )}
          </ul>
        </div>

        {/* Sales Graph */}
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">Sales Overview</h2>
          <SalesGraphComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
