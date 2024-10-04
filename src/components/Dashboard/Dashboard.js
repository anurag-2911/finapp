import React, { useEffect, useState } from 'react';
import { getFinancingOptions } from '../api/apiService'; // Example of an authenticated request

function Dashboard() {
  const [financingOptions, setFinancingOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFinancingOptions();
        setFinancingOptions(response.data);
      } catch (err) {
        console.error('Failed to fetch financing options:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {financingOptions.map((option, index) => (
          <li key={index}>{option.name}</li> // Customize this to show relevant data
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
