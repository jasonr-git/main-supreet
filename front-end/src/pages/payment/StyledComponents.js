import styled from 'styled-components';
import bgImage from '../../images/bg2.avif'; // Ensure the path is correct

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

export const FooterWrapper = styled.div`
  color: white;
  width: 100%;
  position: relative;
  z-index: 12;
`;

export const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  z-index: 0;
`;

// Styles for Form
export const UniqueFormContainer = styled.div`
  width: 90%;
  max-width: 600px;
  padding: 30px;
  margin: 20px auto;
  border-radius: 12px;
  margin-top: 10rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;

export const UniqueFormStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const UniqueLabel = styled.label`
  font-weight: 600;
  color: #333;
`;

export const UniqueInput = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const UniqueSelect = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const UniqueTextarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const UniqueButton = styled.button`
  margin-top: 15px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #007bff 0%, #0056b3 100%);
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(90deg, #0056b3 0%, #003f88 100%);
    transform: translateY(-2px);
  }
`;

// Payment styles
export const UniquePaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.0);
  padding: 20px;
`;

export const UniquePaymentHeader = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
`;

export const UniqueQRWrapper = styled.div`
  background: linear-gradient(135deg, #00008b, #8b0000);
  padding: 20px;
  border-radius: 10px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const Icon = styled.span`
  cursor: pointer;
  font-size: 0.95rem;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

export const UniquePayButton = styled.button`
  padding: 12px 24px;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

export const UniqueFooter = styled.p`
  color: #7f8c8d;
  margin-top: 20px;
  text-align: center;
`;