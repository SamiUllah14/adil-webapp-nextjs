"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronDown, FiMoreVertical, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface DropdownProps {
  title: string;
  items: { label: string; path: string }[];
  dropdownKey: string;
  toggleDropdown: (dropdown: string) => void;
  isOpen: boolean;
  handleNavigation: (path: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, items, dropdownKey, toggleDropdown, isOpen, handleNavigation }) => (
  <div>
    <button
      onClick={() => toggleDropdown(dropdownKey)}
      className="flex justify-between w-full items-center px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none"
    >
      {title} <FiChevronDown />
    </button>
    {isOpen && (
      <div className="mt-2 space-y-2 pl-4">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item.path)}
            className="block text-gray-300 hover:text-white"
          >
            {item.label}
          </button>
        ))}
      </div>
    )}
  </div>
);

const AdminSidebar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({
    dropdown1: false,
    dropdown2: false,
    dropdown3: false,
  });
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = (dropdown: string) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const handleNavigation = useCallback((path: string) => {
    router.push(path);
    setSidebarOpen(false); // Close sidebar after navigation
  }, [router]);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex">
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4  z-50 text-black:400 focus:outline-none"
      >
<FiMoreVertical size={24} />
</button>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white lg:w-64 w-1/2 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:flex lg:flex-col z-50`}
      >
        <div className="flex flex-col p-4 space-y-4">
          {/* Close button inside the sidebar */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden fixed top-2 right-4 z-50 text-white focus:outline-none"
          >
<FiX size={24} />
</button>

          {/* Dropdowns */}
          <Dropdown
            title="Admin"
            items={[
              { label: 'User Management', path: '/Admin/UserManagement' },
              { label: 'Item 2', path: '/item2' },
            ]}
            dropdownKey="dropdown1"
            toggleDropdown={toggleDropdown}
            isOpen={dropdownOpen['dropdown1']}
            handleNavigation={handleNavigation}
          />

          <Dropdown
            title="Dropdown Two"
            items={[
              { label: 'Item 1', path: '/item1' },
              { label: 'Item 2', path: '/item2' },
            ]}
            dropdownKey="dropdown2"
            toggleDropdown={toggleDropdown}
            isOpen={dropdownOpen['dropdown2']}
            handleNavigation={handleNavigation}
          />

          <Dropdown
            title="Dropdown Three"
            items={[
              { label: 'Item 1', path: '/item1' },
              { label: 'Item 2', path: '/item2' },
            ]}
            dropdownKey="dropdown3"
            toggleDropdown={toggleDropdown}
            isOpen={dropdownOpen['dropdown3']}
            handleNavigation={handleNavigation}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
