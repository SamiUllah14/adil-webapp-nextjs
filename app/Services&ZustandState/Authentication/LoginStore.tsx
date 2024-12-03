import { create } from 'zustand';
import axios from 'axios';

interface LoginState {
  mobileNumber: string;
  password: string;
  setMobileNumber: (mobileNumber: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<boolean>;
}

const useLoginStore = create<LoginState>((set) => ({
  mobileNumber: '',
  password: '',
  setMobileNumber: (mobileNumber) => set({ mobileNumber }),
  setPassword: (password) => set({ password }),
  login: async () => {
    try {
      const { mobileNumber, password } = useLoginStore.getState();
      const response = await axios.post('http://localhost:5151/api/person/login', {
        mobileNumber,
        password,
      });
      console.log('Login Success:', response.data);
      return true;
    } catch (error) {
      console.error('Login Failed:', error);
      return false;
    }
  },
}));

export default useLoginStore;
