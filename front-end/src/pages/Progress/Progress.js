import React from 'react';
import styled from 'styled-components';
import FinancialStats from '../../components/Experience/FinancialStats';
import backgroundImage from '../../images/probg.jpeg';

const DashboardContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(60deg, #8B0000 20%, #000000 40%, #000000 60%, #00008B 80%);
  padding-top: 7rem;

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

const Dashboard = () => {
  return (
    <DashboardContainer>
      <FinancialStats />
    </DashboardContainer>
  );
};

export default Dashboard;