import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useLoginStore from '@/app/Services&ZustandState/Authentication/LoginStore';

const useAdminProtection = () => {
  const { role, token } = useLoginStore();
  const router = useRouter();

  useEffect(() => {
    // Wait for role and token to be initialized
    if (token === null) {
      console.log("Waiting for token...");
      return; // Do nothing until token is loaded
    }

    if (!role) {
      console.log("Role is missing. Redirecting to home.");
      router.replace('/'); // Redirect if no role
      return;
    }

    if (role !== 'Admin') {
      console.log("User is not Admin. Redirecting to home.");
      router.replace('/'); // Redirect if role is not Admin
    }
  }, [role, token, router]);
};

export default useAdminProtection;
