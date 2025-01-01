// GoogleMapsComponent.js
"use client";

const GoogleMapsComponent = () => {
  return (
    <div className="w-full md:h-[500px] lg:h-[600px]">
      <iframe
        title="Google Map"
        src={`https://maps.google.com/maps?q=32.263392165638614,74.6604194080271&z=15&output=embed`}
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default GoogleMapsComponent;
