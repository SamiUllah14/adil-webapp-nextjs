import React, { useState } from "react";
import { create } from 'zustand';
import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash, FaSave } from "react-icons/fa";

// Employee Interface
interface Employee {
  id: number;
  name: string;
  address: string;
  mobileNumber: string;
  passwordHash: string;
}

// Pagination Store with Zustand
interface PaginationStore {
  currentPage: number;
  rowsPerPage: number;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}

const usePaginationStore = create<PaginationStore>((set) => ({
  currentPage: 1,
  rowsPerPage: 10,
  setCurrentPage: (page) => set({ currentPage: page }),
  setRowsPerPage: (rows) => set({ rowsPerPage: rows, currentPage: 1 })
}));

// EmployeeTable Component
interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedEmployee: Partial<Employee>) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onDelete, onEdit }) => {
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<Employee>>({});

  // Zustand store for pagination
  const { currentPage, rowsPerPage, setCurrentPage, setRowsPerPage } = usePaginationStore();

  // Pagination Calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentEmployees = employees.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  // Pagination Handlers
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
  };

  // Edit Handlers (same as before)
  const handleEditClick = (employee: Employee) => {
    setEditRowId(employee.id);
    setEditValues(employee);
  };

  const handleSaveClick = (id: number) => {
    onEdit(id, editValues);
    setEditRowId(null);
    setEditValues({});
  };

  const handleInputChange = (field: keyof Employee, value: string) => {
    setEditValues({ ...editValues, [field]: value });
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:mt-0 mt-10">
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        {/* Mobile View - Card Layout */}
        <div className="block md:hidden">
          {currentEmployees.map((employee) => (
            <div key={employee.id} className="border-b p-4 hover:bg-gray-50">
              {editRowId === employee.id ? (
                <>
                  {/* Edit Mode */}
                  <div className="flex flex-col space-y-2">
                    <input
                      className="border rounded p-1 text-sm"
                      type="text"
                      value={editValues.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                    <input
                      className="border rounded p-1 text-sm"
                      type="text"
                      value={editValues.address || ""}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                    <input
                      className="border rounded p-1 text-sm"
                      type="text"
                      value={editValues.mobileNumber || ""}
                      onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                    />
                    <button className="text-green-500" onClick={() => handleSaveClick(employee.id)}>
                      <FaSave />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Display Mode */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold">{employee.name}</div>
                    <div className="flex space-x-10">
                      <button className="text-blue-500" onClick={() => handleEditClick(employee)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-500" onClick={() => onDelete(employee.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{employee.address}</div>
                    <div>{employee.mobileNumber}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View - Table Layout */}
        <table className="min-w-full bg-white hidden md:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold text-base">Name</th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold text-base">Address</th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold text-base">Mobile Number</th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id} className="border-t hover:bg-gray-50">
                {editRowId === employee.id ? (
                  <>
                    {/* Edit Mode */}
                    <td className="py-3 px-6">
                      <input
                        className="border rounded p-1 text-sm"
                        type="text"
                        value={editValues.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-6">
                      <input
                        className="border rounded p-1 text-sm"
                        type="text"
                        value={editValues.address || ""}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-6">
                      <input
                        className="border rounded p-1 text-sm"
                        type="text"
                        value={editValues.mobileNumber || ""}
                        onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-6">
                      <button
                        className="text-green-500"
                        onClick={() => handleSaveClick(employee.id)}
                      >
                        <FaSave className="w-5 h-5" />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {/* Display Mode */}
                    <td className="py-3 px-6 text-base">{employee.name}</td>
                    <td className="py-3 px-6 text-base">{employee.address}</td>
                    <td className="py-3 px-6 text-base">{employee.mobileNumber}</td>
                    <td className="py-3 px-6">
                      <div className="flex space-x-3">
                        <button
                          className="text-blue-500"
                          onClick={() => handleEditClick(employee)}
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => onDelete(employee.id)}
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Rows per page:</span>
            <select 
              className="border rounded p-1 text-sm"
              value={rowsPerPage}
              onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span>
              {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, employees.length)} of {employees.length}
            </span>
            <button 
              className={`text-gray-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <button 
              className={`text-gray-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;