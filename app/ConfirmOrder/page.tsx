"use client";
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCity, FaPhoneAlt, FaTruck } from "react-icons/fa";
import OrderReportComponent from "./components/report";
import CustomButton from "../components/CustomButton/CustomButton";
import { useCartStore } from "@/app/ShoppingCart/ZustandStore/store";

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
  const [isMobile, setIsMobile] = useState(false);
  const { cartItems, calculateTotal } = useCartStore();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Pasrur");
  const [altPhone, setAltPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const delivery = { address, city, altPhone };
    const totalAmount = calculateTotal();
    const tax = 10;
    const finalAmount = totalAmount + tax;
    const orderItems = cartItems.map(item => ({
      productName: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.quantity * item.price,
    }));
    const order = { totalAmount, tax, finalAmount, orderItems };
    const payload = { delivery, order };

    try {
      const response = await fetch("http://localhost:5151/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order placed. Order ID:", data.OrderId);
        setSuccess(true);
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-5xl flex-col gap-8">
        {isMobile && <OrderReportComponent />}
        <div className="w-full rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-8 flex items-center gap-2 text-primary-600">
            <FaTruck className="h-6 w-6" />
            <h1 className="text-2xl font-bold text-gray-800">Delivery Details</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-2 text-gray-400" />
                <input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium">
                City
              </label>
              <div className="relative">
                <FaCity className="absolute left-3 top-2 text-gray-400" />
                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="pl-10"
                >
                  {pakistaniCities.map(cityName => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="altPhone" className="block text-sm font-medium">
                Mobile Number
              </label>
              <div className="relative">
                <FaPhoneAlt className="absolute left-3 top-2 text-gray-400" />
                <input
                  id="altPhone"
                  type="tel"
                  placeholder="Provide another contact"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <CustomButton text={loading ? "Processing..." : "Proceed"} />
          </form>
          {success && <p className="text-green-500 mt-4">Order placed successfully!</p>}
        </div>
        {!isMobile && <OrderReportComponent />}
      </div>
    </main>
  );
};

export default DeliveryFormPage;
