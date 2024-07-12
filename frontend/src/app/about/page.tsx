'use client';
import { isHealth } from '@/utils/TypeGuard';
import React, { useState, useEffect } from 'react';

const HealthStatus = () => {
  const [data, setData] = useState('Loading...');

  useEffect(() => {
    async function getHealth() {
      const response = await fetch('/api/health');
      const data = await response.json();
      if (!isHealth(data)) {
        throw new Error('API type error');
      }
      setData(data.health);
    }
    getHealth();
  }, []);

  return (
    <div>
      <h1>Health Status</h1>
      <p>{data}</p>
    </div>
  );
};

export default HealthStatus;
