import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  linearGradient,
  defs,
} from 'recharts';
import backgroundImage from '../../images/probg.jpeg'; // Adjust the path as per your project structure

// Updated society progress data
const updatedData = [
  {
    year: '2020-21',
    shareMembers: 770,
    shareCapital: 3566600,
    deposit: 15119007,
    loan: 15514105,
    profitLoss: -105897,
    loanRecoveryPercentage: 99.9,
    dividendPercentage: 0,
  },
  {
    year: '2021-22',
    shareMembers: 1071,
    shareCapital: 5231500,
    deposit: 49657424,
    loan: 48865163,
    profitLoss: 702574,
    loanRecoveryPercentage: 99.87,
    dividendPercentage: 6,
  },
  {
    year: '2022-23',
    shareMembers: 1361,
    shareCapital: 7439800,
    deposit: 92746506,
    loan: 99042949,
    profitLoss: 1907204,
    loanRecoveryPercentage: 98.95,
    dividendPercentage: 10,
  },
  {
    year: '2023-24',
    shareMembers: 1709,
    shareCapital: 9168700,
    deposit: 131896941,
    loan: 147603022,
    profitLoss: 3453557,
    loanRecoveryPercentage: 97.78,
    dividendPercentage: 10,
  },
];

// Main container for the dashboard
const DashboardContainer = styled.div`
  position: relative;
  padding: 50px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    filter: blur(6px);
    z-index: -1;
  }
`;

// Card component to wrap the graph
const Card = styled.div`
  margin-top: 8%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 1300px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const GraphWrapper = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
`;

// Custom Tooltip for better visualization
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p>{label}</p>
        <p style={{ color: payload[0].color }}>{`Profit / Loss: ₹${payload[0].value.toLocaleString()}`}</p>
        <p style={{ color: payload[1].color }}>{`Loan Recovery: ${payload[1].value.toFixed(2)}%`}</p>
        <p style={{ color: '#82ca9d' }}>{`Dividend Percentage: ${payload[2].value}%`}</p>
      </div>
    );
  }
  return null;
};

// Main Dashboard component
const Dashboard = () => {
  const [chartData, setChartData] = useState(updatedData);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => generateRandomData(prevData));
    }, 4000); // Updates data every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const generateRandomData = (data) => {
    return data.map((item) => ({
      ...item,
      profitLoss: item.profitLoss,
      loanRecoveryPercentage: item.loanRecoveryPercentage,
    }));
  };

  return (
    <DashboardContainer>
      <Card>
        <h2>Financial Progress</h2>
        <GraphWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="colorLoanRecovery"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: '#333' }}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 12, fill: '#333' }} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => {
                  if (value === 'profitLoss') return 'Profit / Loss';
                  if (value === 'loanRecoveryPercentage')
                    return 'Loan Recovery';
                  if (value === 'dividendPercentage')
                    return 'Dividend Percentage';
                  return value;
                }}
              />
              <Area
                type="monotone"
                dataKey="profitLoss"
                stroke="#82ca9d"
                fill="url(#colorProfit)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="loanRecoveryPercentage"
                stroke="#8884d8"
                fill="url(#colorLoanRecovery)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="dividendPercentage"
                stroke="#ff7300"
                fillOpacity={0}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </GraphWrapper>
      </Card>
    </DashboardContainer>
  );
};

export default Dashboard;