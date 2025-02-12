import React from 'react';
import QRCode from 'qrcode.react';
import styled from 'styled-components';

// Unique styled components for the Payment section
const UniquePaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.0);
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.0);
  max-width: 400px;
  margin: 40px auto;
  position: relative;
  z-index: 1; /* Ensures it appears above the background */

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
    margin: 20px auto;
  }
`;

const UniquePaymentHeader = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const UniqueQRWrapper = styled.div`
  background: linear-gradient(135deg, #00008b, #8b0000);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const UniquePayButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const UniqueFooter = styled.p`
  color: #7f8c8d;
  margin-top: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

// Payment Component
const Payment = ({ upiID, amount, onPaymentComplete }) => {
  const qrValue = `upi://pay?pa=${upiID}&am=${amount}`;

  const handlePayNow = () => {
    window.location.href = `upi://pay?pa=${upiID}&am=${amount}`;
    onPaymentComplete();
  };

  return (
    <UniquePaymentContainer>
      <UniquePaymentHeader>Pay with UPI</UniquePaymentHeader>
      <UniqueQRWrapper>
        <QRCode
          value={qrValue}
          size={256}
          bgColor="transparent"
          fgColor="white"
          level="H"
        />
      </UniqueQRWrapper>
      <UniquePayButton onClick={handlePayNow}>
        Pay Now with UPI App
      </UniquePayButton>
      <UniqueFooter>Scan the QR code with your UPI app to pay ₹{amount}</UniqueFooter>
    </UniquePaymentContainer>
  );
};

export default Payment;
