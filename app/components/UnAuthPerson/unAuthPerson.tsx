import React from 'react';
import { useRouter } from 'next/navigation';

const UnAuthPerson = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/'); // Navigate to the home route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> {/* Center content */}
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center"> {/* Card styling */}
        <p className="text-lg font-medium text-gray-800 mb-4">You do not have permission to visit this page.</p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go back to home
        </button>
      </div>
    </div>
  );
};

export default UnAuthPerson;
