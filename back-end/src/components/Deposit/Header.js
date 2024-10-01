import React from 'react';
import styled from 'styled-components';
import Logout from '../Logout';

const HeaderWrapper = styled.header`
  background-color: lightgrey;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const LogoutButton = styled(Logout)`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-decoration: underline;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c;
  }
`;

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <HeaderWrapper>
      <Title>Content Manager</Title>
      <LogoutButton setIsAuthenticated={setIsAuthenticated}>Logout</LogoutButton>
    </HeaderWrapper>
  );
};

export default Header;
