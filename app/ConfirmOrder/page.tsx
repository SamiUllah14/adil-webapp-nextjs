"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaCity, FaPhoneAlt, FaTruck } from "react-icons/fa";
import OrderReportComponent from "./components/report";
import CustomButton from "../components/CustomButton/CustomButton";
import { useCartStore } from "@/app/ShoppingCart/ZustandStore/store";
import useLoginStore from "@/app/Services&ZustandState/Authentication/LoginStore";
import { HubConnectionBuilder, HubConnection, LogLevel } from "@microsoft/signalr";

// List of Pakistani cities
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
  "Toba Tek Singh",
  "Vehari",
  "Wah Cantonment",
  "Wazirabad",
  "Zhob",
];

const DeliveryFormPage: React.FC = () => {
  const router = useRouter();
  const { token } = useLoginStore();
  const { cartItems, calculateTotal } = useCartStore();

  const [isMobile, setIsMobile] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Pasrur");
  const [altPhone, setAltPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Establish SignalR connection
  useEffect(() => {
    const setupSignalRConnection = async () => {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5151/notificationHub") // Make sure this matches your backend URL
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      try {
        await conn.start();
        console.log("SignalR connected on customer side.");
        setConnection(conn);
      } catch (error) {
        console.error("SignalR connection failed:", error);
      }
    };

    setupSignalRConnection();

    return () => {
      if (connection) {
        connection.stop();
        console.log("SignalR connection stopped (customer side).");
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      router.push("/Login");
      return;
    }

    setLoading(true);

    // Prepare order data
    const delivery = { address, city, altPhone };
    const totalAmount = calculateTotal();
    const tax = 10;
    const finalAmount = totalAmount + tax;
    const orderItems = cartItems.map((item) => ({
      productName: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.quantity * item.price,
    }));
    const payload = { delivery, order: { totalAmount, tax, finalAmount, orderItems } };

    // Call the backend to place the order
    try {
      const response = await fetch("http://localhost:5151/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order placed. Order ID:", data.OrderId);
        setSuccess(true);

        // The server (controller) will broadcast to admins via SignalR,
        // so we don't call a hub method here.
      } else {
        console.error("Failed to place order:", await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-gray-50 p-4">
      <div className="flex w-full max-w-4xl flex-col gap-8 rounded-lg shadow-lg bg-white p-6">
        {isMobile && <OrderReportComponent />}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-blue-600">
            <FaTruck className="h-8 w-8" />
            <h1 className="text-3xl font-extrabold">Delivery Details</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Address */}
            <div className="flex flex-col gap-1">
              <label htmlFor="address" className="text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="relative flex items-center">
                <FaMapMarkerAlt className="absolute left-3 text-gray-400" />
                <input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 
                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* City */}
            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="text-sm font-medium text-gray-700">
                City
              </label>
              <div className="relative flex items-center">
                <FaCity className="absolute left-3 text-gray-400" />
                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 
                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  {pakistaniCities.map((cityName) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col gap-1">
              <label htmlFor="altPhone" className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="relative flex items-center">
                <FaPhoneAlt className="absolute left-3 text-gray-400" />
                <input
                  id="altPhone"
                  type="tel"
                  placeholder="Provide contact number"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 
                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              <CustomButton text={loading ? "Processing..." : "Proceed"} />
              <CustomButton text="Continue Shopping" onClick={() => router.push("/")} />
            </div>
          </form>

          {/* Success Message */}
          {success && (
            <div className="mt-4 rounded-lg bg-green-100 p-4 text-green-800">
              Order placed successfully!
            </div>
          )}
        </div>
        {!isMobile && <OrderReportComponent />}
      </div>
    </main>
  );
};

export default DeliveryFormPage;
