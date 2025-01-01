// components/WhatsAppLogo.tsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon

const WhatsAppLogo: React.FC = () => {
  const whatsappNumber = '+923443242515'; // Replace with your WhatsApp number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
    >
      <div className="flex items-center justify-center w-10 h-10 bg-white text-green-500 rounded-full mr-2">
        <FaWhatsapp size={24} />
      </div>
      <span className="font-medium text-sm md:text-base">
        Contact with Dr. Adil
      </span>
    </a>
  );
};

export default WhatsAppLogo;
