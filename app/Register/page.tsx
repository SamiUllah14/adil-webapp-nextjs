"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInputField from '../components/CustomInputField/CustomInputField';
import Link from 'next/link';
import useRegisterStore from '../Services&ZustandState/RegisterStore';

const Register = () => {
  const { name, address, mobileNumber, password, setName, setAddress, setMobileNumber, setPassword, register } =
    useRegisterStore();

  const [dialogMessage, setDialogMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register();
    if (success) {
      setDialogMessage('Registration Successful!');
    } else {
      setDialogMessage('Registration Failed. Please try again.');
    }
  };

  return (
    <div className="bg-[#D6EDEB] flex justify-center items-center pt-10 pb-10">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col lg:flex-row items-center justify-between w-full max-w-4xl">
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
          <img
            src="https://placehold.co/400x400"
            alt="A woman in a light blue hijab and shirt, smiling while looking at her phone"
            className="rounded-lg"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold text-[#1A202C] mb-2">Create An Account</h1>
          <p className="text-[#4A5568] mb-6">
            We will use this information to contact you regarding booking confirmations.
          </p>
          <form onSubmit={handleRegister}>
            <CustomInputField
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CustomInputField
              type="text"
              placeholder="Your Home Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <CustomInputField
              type="number"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <CustomInputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="justify-end flex">
              <CustomButton text="Register" />
            </div>
          </form>
          {dialogMessage && (
            <div className="mt-4 p-4 bg-gray-200 text-center text-[#1A202C] rounded">
              {dialogMessage}
            </div>
          )}
          <p className="mt-4 text-[#1A202C]">
            Already a user?{' '}
            <Link href="/Login" className="text-[#1A202C] underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
