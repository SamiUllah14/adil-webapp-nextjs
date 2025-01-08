'use client';

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesGraphComponent: React.FC = () => {
  const [salesData, setSalesData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch sales data from the backend
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:5151/api/checkout/sales-data'); // Adjust endpoint as needed
        if (response.ok) {
          const data = await response.json();

          // Extract labels and sales data
          const formattedLabels = data.map(
            (item: { month: string; totalSales: number }) => item.month
          );
          const formattedSales = data.map(
            (item: { month: string; totalSales: number }) => item.totalSales
          );

          setLabels(formattedLabels);
          setSalesData(formattedSales);
          setLoading(false);
        } else {
          console.error('Failed to fetch sales data.');
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const data = {
    labels: labels, // Labels now include the month and year
    datasets: [
      {
        label: 'Monthly Sales (in PKR)',
        data: salesData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Sales Data (with Year)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales Amount (PKR)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month-Year',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
      {loading ? (
        <p>Loading sales data...</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default SalesGraphComponent;
