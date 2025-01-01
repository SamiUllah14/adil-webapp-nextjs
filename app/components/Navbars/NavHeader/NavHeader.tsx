"use client";

import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Link from "next/link";
import useLoginStore from "@/app/Services&ZustandState/Authentication/LoginStore";
import CustomSearchBar from "../../CustomSearchBar/CustomSearchBar";
import { useCartStore } from "@/app/ShoppingCart/ZustandStore/store";
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LogoImage from '@/app/images/greenlogos.png'

const NavHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { token, logout } = useLoginStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems } = useCartStore();

  const closeSidebar = () => setIsSidebarOpen(false);
  const router = useRouter()

  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    if (token || localStorage.getItem("jwtToken")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-40">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-12">
          <Link href="/" className="flex items-center">
          <Image
      src={LogoImage}
      alt="Adil Pharmacy Pasrur logo"
      width={60} 
      height={60} 
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
            <div>
              <h1 className="text-2xl font-semibold text-green-600">
                Adil Pharmacy
              </h1>
              <p className="text-sm text-gray-500">Wellness for Life</p>
            </div>
          </Link>

          <div className="hidden lg:flex flex-1 mx-6">
            <CustomSearchBar
              placeholder="Search Store" onSearchComplete={function (): void {
                throw new Error("Function not implemented.");
              } }             
            />
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="hidden lg:flex items-center space-x-2">
                <i className="fas fa-user text-xl text-gray-600"></i>
                <div>
                  <button
                    onClick={handleLogout}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Logout
                  </button>
                  <p className="text-sm text-gray-500">Welcome back!</p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Link href="/Login" className="text-blue-500 hover:text-blue-600">
                  Login
                </Link>
                <span className="text-gray-400">or</span>
                <Link href="/Register" className="text-blue-500 hover:text-blue-600">
                  Register
                </Link>
       
              </div>
            )}

            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => router.push('/ShoppingCart')}              
            >
              <FaShoppingCart className="text-2xl text-gray-600" />
              {totalCartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {totalCartQuantity}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavHeader;
