"use client";
import React, { useState } from 'react';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInputField from '../components/CustomInputField/CustomInputField';
import Link from 'next/link';
import useLoginStore from '../Services&ZustandState/LoginStore';

const Login = () => {
  const { mobileNumber, password, setMobileNumber, setPassword, login } = useLoginStore();

  const [dialogMessage, setDialogMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login();
    if (success) {
      setDialogMessage('Login Successful! Welcome back.');
    } else {
      setDialogMessage('Login Failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#E2F3F1] p-6">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-lg flex flex-col items-center space-y-8">
        {/* Form Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <CustomInputField
            type="number"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobileNumber(e.target.value)}
          />

          <CustomInputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <CustomButton text="Sign In" />
          </div>
        </form>

        {/* Dialog for Success/Failure */}
        {dialogMessage && (
          <div className="mt-4 p-4 bg-gray-200 text-center text-[#1A202C] rounded">
            {dialogMessage}
          </div>
        )}

        {/* Links */}
        <p className="mt-4 text-[#1A202C]">
          Don&apos;t have an account?{' '}
          <Link href="/Register" className="text-[#1A202C] underline">
            Register
          </Link>
        </p>
        <p className="mt-2 text-[#1A202C]">
          <Link href="/ResetPassword" className="text-[#1A202C] underline">
            Reset Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
