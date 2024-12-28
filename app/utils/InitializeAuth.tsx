'use client';

import { useEffect } from 'react';
import useLoginStore from '../Services&ZustandState/Authentication/LoginStore';

const InitializeAuth = () => {
  const { setToken } = useLoginStore();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setToken(token); // This will also extract the role
    }
  }, [setToken]);

  return null;
};

export default InitializeAuth;
