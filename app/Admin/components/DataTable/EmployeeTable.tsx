import React from 'react';
import { FaPhone, FaEnvelope, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Employee {
  name: string;
  position: string;
  office: string;
  contact: {
    phone: string;
    email: string;
  };
}

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  return (
    <div className="w-full px-2 sm:px-4">
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        {/* Mobile View - Card Layout */}
        <div className="block md:hidden">
          {employees.map((employee, index) => (
            <div key={index} className="border-b p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold">{employee.name}</div>
                <div className="flex space-x-2">
                  <button className="text-blue-500">
                    <FaPhone />
                  </button>
                  <button className="text-blue-500">
                    <FaEnvelope />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div>{employee.position}</div>
                <div>{employee.office}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Table Layout */}
        <table className="min-w-full bg-white hidden md:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Name</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Position</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Office</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Contact</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{employee.name}</td>
                <td className="py-2 px-4">{employee.position}</td>
                <td className="py-2 px-4">{employee.office}</td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-500">
                      <FaPhone />
                    </button>
                    <button className="text-blue-500">
                      <FaEnvelope />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col sm:flex-row items-center justify-between p-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Rows per page:</span>
            <select className="border rounded p-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span>1 - {employees.length} of {employees.length}</span>
            <button className="text-gray-500">
              <FaChevronLeft />
            </button>
            <button className="text-gray-500">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;