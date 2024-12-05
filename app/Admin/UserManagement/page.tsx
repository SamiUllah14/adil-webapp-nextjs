"use client";
import CustomSearchBar from '@/app/components/CustomSearchBar/CustomSearchBar';
import React from 'react';
import EmployeeTable from '../components/DataTable/EmployeeTable';


const employees = [
  {
    name: 'Tiger Nixon',
    position: 'System Architect',
    office: 'Edinburgh',
    contact: { phone: '123-456-7890', email: 'tiger@company.com' },
  },
  {
    name: 'Sonya Frost',
    position: 'Software Engineer',
    office: 'Edinburgh',
    contact: { phone: '123-456-7890', email: 'sonya@company.com' },
  },
  {
    name: 'Tatyana Fitzpatrick',
    position: 'Regional Director',
    office: 'London',
    contact: { phone: '123-456-7890', email: 'tatyana@company.com' },
  },
];


const Page = () => {
  return (
    <div className="min-h-screen p-8 flex flex-col lg:flex-row">
      {/* Flex container for layout */}
      <div className="flex flex-col lg:items-start items-center justify-center h-full">
        <div className="text-center text-2xl sm:text-3xl font-bold mb-4">
          User Management
        </div>
        <div className="text-center text-lg sm:text-xl font-bold">
          Users data
        </div>
        <div className="lg:mt-5 mt-2">
          <CustomSearchBar
            placeholder={'Search Users'}
            onSearch={function (): void {
              throw new Error('Function not implemented.');
            }}

          />

        </div>
        <EmployeeTable employees={employees} />

      </div>
    </div>
  );
};

export default Page;


