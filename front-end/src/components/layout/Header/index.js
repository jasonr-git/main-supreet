import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  transition: transform 0.3s ease-in-out, padding 0.3s ease-in-out;
  transform-origin: top;
  
  @media (max-width: 768px) {
    display: none;
  }
  
  &.folded {
    transform: scaleY(0.8);
    padding: 0.5rem 0;
  }
`;

const HeaderTitle = styled.h1`
  text-align: center;
  color: white;
  font-size: 1.5rem;
  margin: 0;
  padding: 1rem;
  background: linear-gradient(45deg, rgba(255, 0, 0, 0.3), rgba(0, 0, 255, 0.3));
  backdrop-filter: blur(10px);
  
  @media (max-width: 960px) {
    font-size: 1.2rem;
    padding: 0.8rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem;
  }
`;

const Header = ({ folded = false }) => {
  return (
    <HeaderContainer className={folded ? 'folded' : ''}>
      <HeaderTitle>
        ಸುಪ್ರೀತ್ ಸೌಹಾರ್ದ ಕೋ-ಆಪರೇಟಿವ್ ಸೊಸೈಟಿ ಲಿ. ಕೆಳಗಿನೂರು
      </HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;