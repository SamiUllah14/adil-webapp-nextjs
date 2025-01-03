'use client';

import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import CustomSearchBar from '../../CustomSearchBar/CustomSearchBar';
import useLoginStore from '@/app/Services&ZustandState/Authentication/LoginStore';

const MainNavbar: React.FC = () => {
  const { role } = useLoginStore(); // Get role from Zustand store
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleSearchSidebar = () => setIsSearchSidebarOpen((prev) => !prev);

  // Navbar links
  const NavLinks = [
    { href: '/', label: 'Home' },
    { href: '/AllProducts', label: 'All Products' },
    { href: '/adil-pharmacy-pasrur', label: 'Location' },
    { href: '/ContactPage', label: 'Contact' },
    ...(role === 'Admin' ? [{ href: '/Admin', label: 'Admin Panel' }] : []), // Admin-specific link
  ];

  // Mobile menu links
  const MOBILE_MENU_ITEMS = [
    { href: '/Login', label: 'Login' },
    { href: '/Register', label: 'Register' },
    { href: '/AllProducts', label: 'All Products' },
    { href: '/adil-pharmacy-pasrur', label: 'Location' },
    { href: '/ContactPage', label: 'Contact' },
    ...(role === 'Admin' ? [{ href: '/Admin', label: 'Admin Panel' }] : []), // Admin-specific link
  ];

  // Mobile menu overlay component
  const MobileMenuOverlay = () => (
    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="absolute top-0 left-0 bg-white w-64 h-full p-4 rounded-tr-lg rounded-br-lg shadow-lg transform transition-transform duration-300 ease-in-out">
        <button
          onClick={toggleMobileMenu}
          className="flex justify-end w-full p-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
        <ul className="flex flex-col space-y-6 mt-8">
          {MOBILE_MENU_ITEMS.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                className="block text-gray-800 font-medium hover:text-[#00bf63] transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Search sidebar component
  const SearchSidebar = () => (
    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="absolute top-0 left-0 bg-white w-80 h-full p-4">
        <button
          onClick={toggleSearchSidebar}
          className="flex justify-end w-full p-2"
        >
          <FaTimes size={18} />
        </button>
        <div className="p-4">
          <CustomSearchBar
            placeholder="Search the store"
            onSearchComplete={toggleSearchSidebar}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full pt-20 shadow-lg bg-[#00bf63]">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden px-8 py-4 flex items-center justify-between">
        <button
          onClick={toggleMobileMenu}
          className="text-xl text-black focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
        <button onClick={toggleSearchSidebar} className="ml-5">
          <FaSearch className="text-lg text-gray-700" />
        </button>
      </div>

      {/* Mobile Overlays */}
      {isMobileMenuOpen && <MobileMenuOverlay />}
      {isSearchSidebarOpen && <SearchSidebar />}

      {/* Desktop Navbar */}
      <nav className="hidden lg:flex lg:justify-center lg:py-4 lg:border-b">
        <div className="flex justify-center w-full mx-auto space-x-6">
          {NavLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="text-black font-semibold hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainNavbar;
