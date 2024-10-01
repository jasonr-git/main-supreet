import React from 'react';
import styled from 'styled-components';
import Logout from './Logout';

const HeaderWrapper = styled.header`
  background-color: #2f3b52;
  color: #fff;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius:10px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color:white;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const LogoutButton = styled(Logout)`
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #ff3333;
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Header = ({ setIsAuthenticated }) => {
  return (
    <HeaderWrapper>
      <Title>Content Manager</Title>
      <LogoutButton setIsAuthenticated={setIsAuthenticated}>Logout</LogoutButton>
    </HeaderWrapper>
  );
};

export default Header;
