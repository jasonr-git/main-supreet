import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: ${({ fullScreen }) => fullScreen ? '100vh' : '200px'};
  gap: 1rem;
`;

const Spinner = styled.div`
  width: ${({ size }) => 
    size === 'small' ? '24px' :
    size === 'large' ? '64px' : '40px'
  };
  height: ${({ size }) => 
    size === 'small' ? '24px' :
    size === 'large' ? '64px' : '40px'
  };
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.text_secondary || '#666'};
  font-size: 1rem;
  margin: 0;
`;

const Loading = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  return (
    <LoadingContainer fullScreen={fullScreen}>
      <Spinner size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingContainer>
  );
};

export default Loading;