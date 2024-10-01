import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Payment from './Payment';
import bgImage from '../../images/bg2.avif'; // Ensure the path is correct

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;
`;

const UniqueFormContainer = styled.div`
  width: 90%;
  max-width: 90%;
  padding: 30px;
  margin: 20px auto;
  border-radius: 12px;
  margin-top: 10rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;

  @media (max-width: 1200px) {
    margin-top: 10rem;
  }

  @media (max-width: 992px) {
    margin-top: 10rem;
  }

  @media (max-width: 768px) {
    margin-top: 6rem;
    max-width: 800px;
  }

  @media (max-width: 576px) {
    margin-top: 6rem;
    max-width: 100%;
  }
`;

const UniqueFormStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const UniqueLabel = styled.label`
  font-weight: 600;
  color: #333;
`;

const UniqueInput = styled.input`
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

const UniqueSelect = styled.select`
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

const UniqueTextarea = styled.textarea`
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

const UniqueButton = styled.button`
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

const Step1 = ({ formData, handleChange, handleNextStep }) => (
  <UniqueFormStep>
    <h2>Enter Details</h2>
    <UniqueLabel htmlFor="name">Name:</UniqueLabel>
    <UniqueInput
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
    />
    <UniqueLabel htmlFor="paymentType">Payment Type:</UniqueLabel>
    <UniqueSelect
      id="paymentType"
      name="paymentType"
      value={formData.paymentType}
      onChange={handleChange}
    >
      <option value="rd">RD Payment</option>
      <option value="loan">Loan Repayment</option>
    </UniqueSelect>
    <UniqueLabel htmlFor="phoneNumber">Phone Number:</UniqueLabel>
    <UniqueInput
      type="tel"
      id="phoneNumber"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
    />
    <UniqueLabel htmlFor="amount">Amount:</UniqueLabel>
    <UniqueInput
      type="number"
      id="amount"
      name="amount"
      value={formData.amount}
      onChange={handleChange}
    />
    <UniqueLabel htmlFor="remarks">Remarks:</UniqueLabel>
    <UniqueTextarea
      id="remarks"
      name="remarks"
      value={formData.remarks}
      onChange={handleChange}
    />
    <UniqueButton type="button" onClick={handleNextStep}>Next</UniqueButton>
  </UniqueFormStep>
);

const Step2 = ({ formData, handleNextStep, handlePreviousStep }) => (
  <UniqueFormStep>
    <h2>Confirm Details</h2>
    <p><strong>Name:</strong> {formData.name}</p>
    <p><strong>Payment Type:</strong> {formData.paymentType}</p>
    <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
    <p><strong>Amount:</strong> {formData.amount}</p>
    <p><strong>Remarks:</strong> {formData.remarks}</p>
    <UniqueButton type="button" onClick={handlePreviousStep}>Back</UniqueButton>
    <UniqueButton type="button" onClick={handleNextStep}>Proceed to Payment</UniqueButton>
  </UniqueFormStep>
);

const Step3 = ({ formData, handlePaymentSuccess, handlePreviousStep, setIsPaymentAttempted }) => {
  const handleProceedToPayment = () => {
    setIsPaymentAttempted(true); // Mark that payment has been attempted
    // Here you'd typically trigger a UPI action like opening the UPI app
  };

  return (
    <UniqueFormStep>
      <Payment
        upiID="supreetsouharda@kbl"
        amount={formData.amount}
        onPaymentComplete={handlePaymentSuccess}
      />
      <UniqueButton type="button" onClick={handlePreviousStep} style={{ marginTop: '20px' }}>
        Back
      </UniqueButton>
    </UniqueFormStep>
  );
};

const Step4 = () => (
  <UniqueFormStep>
   <h2>Your payment is being processed</h2>
<p>Thank you! Your payment is currently being processed. You will receive a confirmation shortly.</p>

  </UniqueFormStep>
);

const FormManager = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    paymentType: '',
    phoneNumber: '',
    amount: '',
    remarks: '',
  });
  const [isPaymentAttempted, setIsPaymentAttempted] = useState(false); // New state to track UPI app open
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Track successful payment

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isPaymentAttempted) {
        // The user has come back from the UPI app
        const paymentState = localStorage.getItem('paymentState'); // Simulate payment success
        if (paymentState) {
          localStorage.removeItem('paymentState');
          setIsPaymentSuccessful(true);
          setStep(4); // Proceed to Step 4 only after payment success
        } else {
          // Handle unsuccessful payment scenario (if required)
          alert('Payment was not successful. Please try again.');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPaymentAttempted]);

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentSuccess = () => {
    localStorage.setItem('paymentState', 'success'); // Simulate storing success in localStorage
    setIsPaymentSuccessful(true);
    handleNextStep(); // Move to Step 4 after payment completion
  };

  return (
    <UniqueFormContainer>
      {step === 1 && (
        <Step1
          formData={formData}
          handleChange={handleChange}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          handlePaymentSuccess={handlePaymentSuccess}
          handlePreviousStep={handlePreviousStep}
          setIsPaymentAttempted={setIsPaymentAttempted}
        />
      )}
      {step === 4 && <Step4 />}
    </UniqueFormContainer>
  );
};

export default FormManager;
