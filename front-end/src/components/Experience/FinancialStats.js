import React from 'react';
import styled from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2020-21', profitLoss: -105897, loanRecoveryPercentage: 99.9, dividendPercentage: 0 },
  { year: '2021-22', profitLoss: 702574, loanRecoveryPercentage: 99.87, dividendPercentage: 6 },
  { year: '2022-23', profitLoss: 1907204, loanRecoveryPercentage: 98.95, dividendPercentage: 10 },
  { year: '2023-24', profitLoss: 3453557, loanRecoveryPercentage: 97.78, dividendPercentage: 10 },
];

const Section = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const KPICard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const KPIIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const KPIValue = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.color || 'white'};
  margin-bottom: 0.25rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const KPILabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ChartContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ChartTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const LegendContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const LegendBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.bg};
  color: ${props => props.color};
  border: 1px solid ${props => props.border};
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(31, 41, 55, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white'
      }}>
        <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{label}</p>
        <p style={{ color: '#10B981', fontSize: '0.875rem' }}>
          Profit: ₹{(payload[0]?.value / 100000).toFixed(2)}L
        </p>
        <p style={{ color: '#3B82F6', fontSize: '0.875rem' }}>
          Recovery: {payload[1]?.value.toFixed(2)}%
        </p>
        <p style={{ color: '#F59E0B', fontSize: '0.875rem' }}>
          Dividend: {payload[2]?.value}%
        </p>
      </div>
    );
  }
  return null;
};

const FinancialStats = () => {
  const latestData = data[data.length - 1];
  
  return (
    <Section>
      <SectionTitle>Financial Transparency</SectionTitle>
      
      <KPIGrid>
        <KPICard>
          <KPIIcon>📈</KPIIcon>
          <KPIValue color="#10B981">₹{(latestData.profitLoss / 100000).toFixed(1)}L</KPIValue>
          <KPILabel>Annual Profit</KPILabel>
        </KPICard>
        
        <KPICard>
          <KPIIcon>💰</KPIIcon>
          <KPIValue color="#3B82F6">{latestData.loanRecoveryPercentage}%</KPIValue>
          <KPILabel>Loan Recovery</KPILabel>
        </KPICard>
        
        <KPICard>
          <KPIIcon>🎯</KPIIcon>
          <KPIValue color="#F59E0B">{latestData.dividendPercentage}%</KPIValue>
          <KPILabel>Dividend Rate</KPILabel>
        </KPICard>
      </KPIGrid>
      
      <ChartContainer>
        <ChartHeader>
          <ChartTitle>Financial Growth</ChartTitle>
          <LegendContainer>
            <LegendBadge bg="rgba(16, 185, 129, 0.2)" color="#10B981" border="rgba(16, 185, 129, 0.3)">
              Profit
            </LegendBadge>
            <LegendBadge bg="rgba(59, 130, 246, 0.2)" color="#3B82F6" border="rgba(59, 130, 246, 0.3)">
              Recovery
            </LegendBadge>
            <LegendBadge bg="rgba(245, 158, 11, 0.2)" color="#F59E0B" border="rgba(245, 158, 11, 0.3)">
              Dividend
            </LegendBadge>
          </LegendContainer>
        </ChartHeader>
        
        <div style={{ height: '400px', width: '100%' }}>
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              
              <Area type="monotone" dataKey="profitLoss" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
              <Area type="monotone" dataKey="loanRecoveryPercentage" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRecovery)" />
              <Area type="monotone" dataKey="dividendPercentage" stroke="#F59E0B" strokeWidth={3} fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>
    </Section>
  );
};

export default FinancialStats;
