import Head from "next/head";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import GoogleMapsComponent from "../adil-pharmacy-pasrur/components/GoogleMapsComponent";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Get in touch with us through our contact page."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Your Company" />
        <meta
          name="keywords"
          content="contact, reach us, company information, support, address, phone"
        />
      </Head>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            Contact Us
          </h1>

          <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
            {/* Left Section */}
            <div className="lg:w-1/2 p-6 sm:p-8 bg-[#00bf63] text-white">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
                Get in Touch
              </h2>
              <div className="flex items-center mb-3 sm:mb-4">
                <FaMapMarkerAlt className="text-xl sm:text-2xl mr-3 sm:mr-4" />
                <span>1234 Main St, Anytown, USA</span>
              </div>
              <div className="flex items-center mb-3 sm:mb-4">
                <FaPhoneAlt className="text-xl sm:text-2xl mr-3 sm:mr-4" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center mb-5 sm:mb-6">
                <FaEnvelope className="text-xl sm:text-2xl mr-3 sm:mr-4" />
                <span>contact@yourdomain.com</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={20} className="sm:size-[24px]" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} className="sm:size-[24px]" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={20} className="sm:size-[24px]" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} className="sm:size-[24px]" />
                </a>
              </div>
              <div className="w-full h-56 sm:h-64 rounded-lg overflow-hidden mt-4">
                <GoogleMapsComponent />
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:w-1/2 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
                Our Office Hours
              </h2>
              <ul className="mb-6 sm:mb-8">
                <li className="mb-2 sm:mb-4">Monday - Friday: 9:00 AM - 5:00 PM</li>
                <li className="mb-2 sm:mb-4">Saturday: 10:00 AM - 3:00 PM</li>
                <li className="mb-2 sm:mb-4">Sunday: Closed</li>
              </ul>

              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Why Contact Us?
              </h3>
              <p className="mb-5 sm:mb-6">
                Whether you have questions about our products, need support, or
                just want to say hello, we are here to help. We pride ourselves
                on providing the best customer service possible.
              </p>

              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Additional Resources
              </h3>
              <p>
                Visit our{" "}
                <a href="/faq" className="text-blue-500 underline">
                  FAQ page
                </a>{" "}
                for quick answers to common questions or browse through our{" "}
                <a href="/blog" className="text-blue-500 underline">
                  Blog
                </a>{" "}
                for the latest updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
