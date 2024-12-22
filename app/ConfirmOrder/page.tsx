'use client';

import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCity, FaPhoneAlt, FaTruck } from "react-icons/fa";
import OrderReportComponent from "./components/report";

const pakistaniCities = [
  "Abbottabad",
  "Ahmedpur East",
  "Ali Pur",
  "Arifwala",
  "Attock",
  "Badin",
  "Bahawalnagar",
  "Bahawalpur",
  "Bannu",
  "Bhakkar",
  "Burewala",
  "Chakwal",
  "Chaman",
  "Charsadda",
  "Chiniot",
  "Dadu",
  "Daska",
  "Dera Ghazi Khan",
  "Dera Ismail Khan",
  "Dijkot",
  "Faisalabad",
  "Fateh Jang",
  "Ghotki",
  "Gojra",
  "Gujranwala",
  "Gujrat",
  "Gwadar",
  "Hafizabad",
  "Haripur",
  "Hasilpur",
  "Haveli Lakha",
  "Hyderabad",
  "Islamabad",
  "Jacobabad",
  "Jaranwala",
  "Jhang",
  "Jhelum",
  "Kamoke",
  "Karachi",
  "Kasur",
  "Khanewal",
  "Khanpur",
  "Kharian",
  "Khushab",
  "Kohat",
  "Kot Addu",
  "Kotli",
  "Lahore",
  "Lakki Marwat",
  "Lala Musa",
  "Larkana",
  "Leiah",
  "Lodhran",
  "Mandi Bahauddin",
  "Mardan",
  "Mian Channu",
  "Mianwali",
  "Mingaora (Swat)",
  "Mirpur Khas",
  "Multan",
  "Murree",
  "Muzaffargarh",
  "Muzaffarabad",
  "Nankana Sahib",
  "Nawabshah",
  "Nowshera",
  "Okara",
  "Pakpattan",
  "Pasrur",
  "Peshawar",
  "Quetta",
  "Rahim Yar Khan",
  "Rawalpindi",
  "Sadiqabad",
  "Sahiwal",
  "Samundri",
  "Sanghar",
  "Sargodha",
  "Shakargarh",
  "Sheikhupura",
  "Shikarpur",
  "Sialkot",
  "Sibi",
  "Skardu",
  "Sukkur",
  "Swabi",
  "Tando Adam",
  "Tando Allahyar",
  "Tank",
  "Toba Tek Singh",
  "Vehari",
  "Wah Cantonment",
  "Wazirabad",
  "Zhob",
];

export default function DeliveryFormPage() {
  const [isMobile, setIsMobile] = useState(false);

  // Update `isMobile` based on screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Pasrur");
  const [altPhone, setAltPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { address, city, altPhone });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-5xl flex-col gap-8">
        {/* Conditional rendering based on screen size */}
        {isMobile && (
          <div className="w-full">
            <OrderReportComponent />
          </div>
        )}

        <div className="w-full rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-8 flex items-center gap-2 text-primary-600">
            <FaTruck className="h-6 w-6" />
            <h1 className="text-2xl font-bold text-gray-800">Delivery Details</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaMapMarkerAlt />
                </span>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter your full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-700 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* City Input */}
            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaCity />
                </span>
                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-10 pr-8 text-gray-700 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                >
                  {pakistaniCities.map((cityName) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Alternative Phone Input */}
            <div>
              <label htmlFor="altPhone" className="mb-1 block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaPhoneAlt />
                </span>
                <input
                  id="altPhone"
                  type="tel"
                  placeholder="Provide another contact"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-700 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Provide a number to ensure successful delivery.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <button
                type="button"
                className="mt-1 w-full cursor-not-allowed rounded-md bg-primary-600 py-2 px-4 text-sm font-semibold text-black shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                disabled
              >
                Cash On Delivery only
              </button>
            </div>

            <div className="pt-5">
              <button
                type="submit"
                className="w-full rounded-md bg-green-600 py-2 px-4 text-sm font-semibold text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>

        {/* Render Order Report below for non-mobile view */}
        {!isMobile && (
          <div className="w-2/2">
            <OrderReportComponent />
          </div>
        )}
      </div>
    </main>
  );
}
