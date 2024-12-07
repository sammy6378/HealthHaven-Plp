
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FlowChart = () => {
  // Data for the bar chart
  const data = {
    labels: ['Chat', 'Phone', 'Video'],
    datasets: [
      {
        label: 'Appointments',
        data: [80, 110, 140], // Example data
        backgroundColor: ['#4A90E2', '#50E3C2', '#9013FE'], // Colors for each bar
        barThickness: 20,
        borderRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => ` ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 150, // Adjust this based on the data
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
        <h3 className="text-lg font-semibold mb-4">Flow Chart</h3>
       
      <p className="text-sm mb-2">Your appointments in October <span className="text-green-500">+25%</span></p>

     
      {/* Bar Chart */}
      <div className="mb-4">
        <Bar data={data} options={options} />
      </div>

    </div>
  );
};

export default FlowChart;
