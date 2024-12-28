import { create } from 'zustand';
import { getRoleFromJwt } from '@/app/utils/jwtUtils';
import axios from 'axios';

interface LoginState {
  mobileNumber: string;
  password: string;
  isLoading: boolean;
  token: string | null;
  role: string | null; // Store the role
  setMobileNumber: (mobileNumber: string) => void;
  setPassword: (password: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  login: () => Promise<boolean>;
  logout: () => void;
}

const useLoginStore = create<LoginState>((set) => ({
  mobileNumber: '',
  password: '',
  isLoading: false,
  token: null,
  role: null,

  setMobileNumber: (mobileNumber) => set({ mobileNumber }),
  setPassword: (password) => set({ password }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setToken: (token) => {
    const role = token ? getRoleFromJwt(token) : null;
    set({ token, role });
  },
  setRole: (role) => set({ role }),

  login: async () => {
    try {
      set({ isLoading: true });
      const { mobileNumber, password } = useLoginStore.getState();
      const response = await axios.post('http://localhost:5151/api/person/login', {
        mobileNumber,
        password,
      });

      const token = response.data.token;
      const role = getRoleFromJwt(token);

      console.log('Login Success:', { token, role });
      set({ token, role });
      localStorage.setItem('jwtToken', token); // Store token

      return true;
    } catch (error) {
      console.error('Login Failed:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('jwtToken');
    set({ token: null, role: null });
  },
}));

export default useLoginStore;
