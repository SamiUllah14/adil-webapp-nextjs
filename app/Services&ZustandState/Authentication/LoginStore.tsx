import { create } from 'zustand';
import axios from 'axios';

interface LoginState {
  mobileNumber: string;
  password: string;
  isLoading: boolean;
  token: string | null;
  setMobileNumber: (mobileNumber: string) => void;
  setPassword: (password: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setToken: (token: string | null) => void;
  login: () => Promise<boolean>;
  logout: () => void;
}

const useLoginStore = create<LoginState>((set) => ({
  mobileNumber: '',
  password: '',
  isLoading: false,
  token: null, // Initialized as null to avoid SSR errors

  setMobileNumber: (mobileNumber) => set({ mobileNumber }),
  setPassword: (password) => set({ password }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setToken: (token) => set({ token }),

  // Login function that interacts with the API
  login: async () => {
    try {
      set({ isLoading: true });
      const { mobileNumber, password } = useLoginStore.getState();
      const response = await axios.post('http://localhost:5151/api/person/login', {
        mobileNumber,
        password,
      });

      console.log('Login Success:', response.data);
      set({ token: response.data.token });
      localStorage.setItem('jwtToken', response.data.token); // Store token

      return true;
    } catch (error) {
      console.error('Login Failed:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout function that clears the token
  logout: () => {
    localStorage.removeItem('jwtToken');
    set({ token: null });
  }
}));

export default useLoginStore;
