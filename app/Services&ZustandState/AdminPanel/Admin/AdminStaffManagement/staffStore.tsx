import { create } from "zustand";
import axios from "axios";

interface Staff {
  id: number;
  name: string;
  address: string;
  mobileNumber: string;
  role: string;
}

interface StaffStore {
  staff: Staff[];
  loading: boolean;
  error: string | null;
  fetchStaff: () => Promise<void>;
  addStaff: (staff: Omit<Staff, "id">) => Promise<void>;
  deleteStaff: (id: number) => Promise<void>;
}

const BASE_URL = "http://localhost:5151/api/admin"; 

export const useStaffStore = create<StaffStore>((set) => ({
  staff: [],
  loading: false,
  error: null,

  fetchStaff: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Staff[]>(`${BASE_URL}/staff`);
      set({ staff: response.data, loading: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error: error.response?.data || error.message, loading: false });
      } else {
        set({ error: "An unexpected error occurred", loading: false });
      }
    }
  },

  addStaff: async (staff) => {
    try {
      const response = await axios.post<Staff>(`${BASE_URL}/staff`, staff);
      set((state) => ({
        staff: [...state.staff, response.data],
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error: error.response?.data || error.message });
      } else {
        set({ error: "An unexpected error occurred" });
      }
    }
  },

  deleteStaff: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/staff/${id}`);
      set((state) => ({
        staff: state.staff.filter((item) => item.id !== id),
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ error: error.response?.data || error.message });
      } else {
        set({ error: "An unexpected error occurred" });
      }
    }
  },
}));
