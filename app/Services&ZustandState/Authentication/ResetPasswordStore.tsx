import { create } from 'zustand';
import axios from 'axios';

interface ResetPasswordState {
  name: string;
  newPassword: string;
  setName: (name: string) => void;
  setNewPassword: (newPassword: string) => void;
  resetPassword: () => Promise<boolean>;
}

const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  name: '',
  newPassword: '',
  setName: (name) => set({ name }),
  setNewPassword: (newPassword) => set({ newPassword }),
  resetPassword: async () => {
    try {
      const { name, newPassword } = useResetPasswordStore.getState();
      const response = await axios.post('http://localhost:5151/api/person/reset-password', {
        name,
        newPassword,
      });
      console.log('Password Reset Success:', response.data);
      return true; // Indicate success
    } catch (error) {
      console.error('Password Reset Failed:', error);
      return false; // Indicate failure
    }
  },
}));

export default useResetPasswordStore;
