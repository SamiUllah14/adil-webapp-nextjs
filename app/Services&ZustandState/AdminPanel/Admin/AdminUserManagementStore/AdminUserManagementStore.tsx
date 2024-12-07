import { create } from "zustand";
import axios from "axios";

interface Employee {
  id: number;
  name: string;
  address: string; // Updated to match camelCase naming
  mobileNumber: string; // Updated to match backend
  passwordHash: string;
}

interface AdminUserManagementState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
  updateEmployee: (id: number, updatedData: Partial<Employee>) => Promise<void>;
}

const useAdminUserManagementStore = create<AdminUserManagementState>((set) => ({
  employees: [],
  loading: false,
  error: null,

  fetchEmployees: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get("http://localhost:5151/api/person");
      set({ employees: response.data, loading: false });
    } catch (error: unknown) {
      console.error("Error fetching employees:", error);
      set({ error: "Failed to fetch employees", loading: false });
    }
  },

  deleteEmployee: async (id) => {
    try {
      set({ loading: true });
      await axios.delete(`http://localhost:5151/api/person/${id}`);
      set((state) => ({
        employees: state.employees.filter((employee) => employee.id !== id),
        loading: false,
      }));
    } catch (error: unknown) {
      console.error("Error deleting employee:", error);
      set({ error: "Failed to delete employee", loading: false });
    }
  },

  updateEmployee: async (id, updatedData) => {
    try {
      set({ loading: true });
      const response = await axios.put(
        `http://localhost:5151/api/person/${id}`,
        updatedData
      );
      set((state) => ({
        employees: state.employees.map((employee) =>
          employee.id === id ? { ...employee, ...response.data } : employee
        ),
        loading: false,
      }));
    } catch (error: unknown) {
      console.error("Error updating employee:", error);
      set({ error: "Failed to update employee", loading: false });
    }
  },
}));

export default useAdminUserManagementStore;
