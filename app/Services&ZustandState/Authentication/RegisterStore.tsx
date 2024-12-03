import { create } from 'zustand';
import axios from 'axios';

interface RegisterState {
  name: string;
  address: string;
  mobileNumber: string;
  password: string;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setMobileNumber: (mobileNumber: string) => void;
  setPassword: (password: string) => void;
  register: () => Promise<boolean>;
}

const useRegisterStore = create<RegisterState>((set) => ({
  name: '',
  address: '',
  mobileNumber: '',
  password: '',
  setName: (name) => set({ name }),
  setAddress: (address) => set({ address }),
  setMobileNumber: (mobileNumber) => set({ mobileNumber }),
  setPassword: (password) => set({ password }),
  register: async () => {
    try {
      const { name, address, mobileNumber, password } = useRegisterStore.getState();
      const response = await axios.post('http://localhost:5151/api/person', {
        name,
        address,
        mobileNumber,
        password,
      });
      console.log('Register Success:', response.data);
      return true;
    } catch (error) {
      console.error('Register Failed:', error);
      return false;
    }
  },
}));

export default useRegisterStore;
