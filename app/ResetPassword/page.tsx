"use client";
import React, { useState } from 'react';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInputField from '../components/CustomInputField/CustomInputField';
import Link from 'next/link'; // Import the Link component from next/link
import useResetPasswordStore from '../Services&ZustandState/Authentication/ResetPasswordStore';

const ResetPassword = () => {
  const { name, newPassword, setName, setNewPassword, resetPassword } = useResetPasswordStore();

  const [dialogMessage, setDialogMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await resetPassword();
    if (success) {
      setDialogMessage('Password reset successful! You can now log in with your new password.');
    } else {
      setDialogMessage('Password reset failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#E2F3F1] p-6">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-lg flex flex-col items-center space-y-8">

        {/* Form Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-gray-600 mt-2">Make sure to enter the correct name.</p>
        </div>

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <CustomInputField 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />

          <CustomInputField 
            type="password" 
            placeholder="New Password" 
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
          />

          {/* Custom Button */}
          <div className="flex justify-center">
            <CustomButton text="Reset" />
          </div>
        </form>

        {/* Dialog for Success/Failure */}
        {dialogMessage && (
          <div className="mt-4 p-4 bg-gray-200 text-center text-[#1A202C] rounded">
            {dialogMessage}
          </div>
        )}

        {/* Login Link */}
        <p className="mt-4 text-[#1A202C]">
          Want to log in?{' '}
          <Link href="/Login" className="text-[#1A202C] underline">
            Click here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default ResetPassword;
