import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
  yAxis: [
    {
      label: 'Count',
    },
  ],
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

// List of all months
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Pre-populate dataset with zero values
const dataset = months.map((month) => ({
  month,
  appointments: 10, // Default value
  prescriptions: 10, // Default value
  billings: 15, // Default value
}));

const DashboardBarChart = () => {
  const [chartWidth, setChartWidth] = useState(800); // Default width for large screens
  const [chartHeight, setChartHeight] = useState(400); // Default height

  useEffect(() => {
    // Function to update chart size based on screen width
    const updateChartSize = () => {
      if (window.innerWidth < 768) {
        setChartWidth(window.innerWidth - 40); // Adjust width for small screens
        setChartHeight(300); // Reduce height on small screens
      } else {
        setChartWidth(700); // Set width for large screens
        setChartHeight(400); // Set height for large screens
      }
    };

    // Update chart size on window resize
    window.addEventListener('resize', updateChartSize);

    // Initial size adjustment
    updateChartSize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  return (
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]} // Months on the X-axis
        series={[
          { dataKey: 'appointments', label: 'Appointments', color: '#FFA500' },
          { dataKey: 'prescriptions', label: 'Prescriptions', color: '#4CAF50' },
          { dataKey: 'billings', label: 'Billings', color: '#2196F3' },
        ]}
        width={chartWidth} // Dynamically set the width
        height={chartHeight} // Dynamically set the height
        {...chartSetting}
      />
  );
};

export default DashboardBarChart;
