'use client';

import { useEffect, useRef } from 'react';
// 1) Import any icon(s) from `react-icons`
import { FaMapMarkerAlt } from 'react-icons/fa';
// 2) We need `renderToString` from React DOM Server to create HTML for the icon
import { renderToString } from 'react-dom/server';

import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const L = await import('leaflet');
      
      if (mapRef.current) {
        // Initialize the map
        const map = L.map(mapRef.current).setView(
          [32.26339246273081, 74.66042191244082],
          13
        );

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© NewYorkSoftwares.com',
        }).addTo(map);

        // 3) Convert a React icon to an HTML string
        const iconHTML = renderToString(
          <FaMapMarkerAlt size={30} className="text-red-500" />
        );

        // 4) Create a custom Leaflet DivIcon using that HTML
        const customIcon = L.divIcon({
          html: iconHTML,
          iconSize: [30, 30], // Adjust based on the icon size
          className: 'flex items-center justify-center', // Tailwind classes
        });

        // 5) Place the marker at your desired coordinates
        const marker = L.marker([32.26339246273081, 74.66042191244082], {
          icon: customIcon,
        }).addTo(map);

        marker.bindPopup('Adil Pharmacy Pasrur');
      }
    })();
  }, []);

  // Tailwind for the map container
  return <div ref={mapRef} className="w-full h-96" />;
}
