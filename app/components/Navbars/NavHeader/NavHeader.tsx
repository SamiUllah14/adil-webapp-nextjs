"use client";
import React, { useState, useEffect } from "react";
import {  FaShoppingCart } from "react-icons/fa";
import Sidebar from "./Sidebar"; // Import Sidebar component
import Link from "next/link"; // Import Link from next/link
import useLoginStore from "@/app/Services&ZustandState/Authentication/LoginStore";
import CustomSearchBar from "../../CustomSearchBar/CustomSearchBar";

const NavHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for managing sidebar visibility
  const { token, logout } = useLoginStore(); // Get token from Zustand store
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true); // Set sidebar to open
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false); // Set sidebar to close
  };

  // Check if user is logged in based on token
  useEffect(() => {
    if (token || localStorage.getItem("jwtToken")) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, [token]);

  const handleLogout = () => {
    // Clear credentials and token from state and local storage
    logout(); // Remove user data from Zustand
    localStorage.removeItem("jwtToken"); // Clear token from local storage
    setIsLoggedIn(false); // Update the state to reflect the logout
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} /> {/* Sidebar component */}
      <nav className="header fixed top-0 left-0 w-full flex items-center py-4 px-8 border-b bg-white z-40 justify-between md:justify-evenly">
        {/* Clickable Adil Pharmacy Section */}
        <Link href="/" className="flex items-center">
          <img src="https://placehold.co/50x50" alt="Adil Pharmacy logo" className="mr-2" />
          <div>
            <h1 className="text-xl font-bold text-green-700">Adil Pharmacy</h1>
            <p className="text-sm text-gray-500">Wellness for Life</p>
          </div>
        </Link>
        <div className="hidden lg:flex">
        <CustomSearchBar placeholder={"Search Store"} onSearch={function (): void {
          throw new Error("Function not implemented.");
        } }/>
        </div>



        <div className="flex items-center">
          {/* Conditional Login/Logout */}
          <div className="hidden lg:flex items-center mr-4">
            {isLoggedIn ? (
              <>
                <i className="fas fa-user text-xl"></i>
                <div className="ml-2">
                  <button onClick={handleLogout} className="text-blue-600">
                    Logout
                  </button>
                  <p className="text-sm text-gray-500">Welcome back!</p>
                </div>
              </>
            ) : (
              <div className="ml-2">
                <Link href="/Login" className="text-blue-600">
                  Login
                </Link>{" "}
                or{" "}
                <Link href="/Register" className="text-blue-600">
                  Register
                </Link>
                <p className="text-sm text-gray-500">Wellness Account</p>
              </div>
            )}
          </div>
          <div className="flex items-center cursor-pointer" onClick={openSidebar}>
            <FaShoppingCart className="text-xl text-gray-500" />
            <span className="ml-1 text-sm">0</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavHeader;
