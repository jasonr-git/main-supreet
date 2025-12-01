import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import bgImage from '../../images/bg2.avif'; // Ensure the path is correct
import Footer from "../../components/Footer";
import Expand from "../../components/imgdetails";
import '@fortawesome/fontawesome-free/css/all.min.css';
import emailjs from 'emailjs-com';
import { send } from 'emailjs-com';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

const FooterWrapper = styled.div`
  color: white;
  width: 100%;
  position: relative;
  z-index: 12;
`;

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  z-index: 0;
`;

const UniqueFormContainer = styled.div`
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

  @media (max-width: 1200px) {
    margin-top: 8rem;
  }

  @media (max-width: 992px) {
    margin-top: 6rem;
  }

  @media (max-width: 768px) {
    margin-top: 6rem;
    max-width: 600px;
  }

  @media (max-width: 576px) {
    margin-top: 4rem;
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
  z-index: 1;

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

// Step 1: When the form is filled out
const sendEmailStep1 = (formData) => {
  const templateParams = {
    from_name: formData.name,
    to_name: 'Receiver Name', // Replace with your receiver email name
    email: 'receiver@example.com', // Replace with the receiver email
    message: `
      Name: ${formData.name}\n
      Payment Type: ${formData.paymentType}\n
      Phone Number: ${formData.phoneNumber}\n
      Amount: ₹${formData.amount}\n
      Remarks: ${formData.remarks}
    `
  };

  emailjs
    .send("service_t5bh5t6", "template_k13hxez", templateParams)
    .then((response) => {
      console.log("Email sent successfully", response);
    })
    .catch((error) => {
      console.log("Email send failed", error);
    });
};

// Step 3: When payment is completed
const sendEmailStep3 = (formData) => {
  const templateParams = {
    from_name: formData.name,
    to_name: 'Receiver Name',
    email: 'receiver@example.com', // Replace with the receiver email
    message: `
      Payment Completed!\n
      Name: ${formData.name}\n
      Payment Type: ${formData.paymentType}\n
      Phone Number: ${formData.phoneNumber}\n
      Amount: ₹${formData.amount}\n
      Remarks: ${formData.remarks}
    `
  };

  emailjs
    .send("service_t5bh5t6", "template_z0aju9q", templateParams)
    .then((response) => {
      console.log("Email sent successfully", response);
    })
    .catch((error) => {
      console.log("Email send failed", error);
    });
};
const Timer = () => {
  // Set the initial time to 10 minutes (600 seconds)
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  useEffect(() => {
    // If timeLeft is 0, stop the interval
    if (timeLeft === 0) return;

    // Set an interval to update the timer every second
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the interval on component unmount or when timeLeft reaches 0
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Format time to MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return <span>{formattedTime}</span>;
};


const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top:1rem;
  width: 100%;
`;

const Icon = styled.span`
  cursor: pointer;
  font-size:0.95rem;
  color: #007bff;

  &:hover {
    color: #0056b3;
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

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiID).then(() => {
      alert('UPI ID copied to clipboard!');
    });
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector('canvas');
    const imageURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'upi-qr-code.png';
    link.click();
  };

  return (
    <UniquePaymentContainer>
       <Timer>00:30</Timer> {/* Timer - Placeholder for real time */}
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
      <UniquePayButton className="mobile-only" onClick={handlePayNow}>
        Pay Now with UPI App
      </UniquePayButton>
      <UniqueFooter className="desktop-only">
        Scan the QR code with your UPI app to pay ₹{amount}
      </UniqueFooter>
      <IconContainer>
        <Icon onClick={handleCopyUPI}>
          {/* Copy UPI Icon */}
          <i className="fa fa-clipboard"></i> Copy UPI
        </Icon>
        <Icon onClick={handleDownloadQR}>
          {/* Download QR Icon */}
          <i className="fa fa-download"></i> Download QR
        </Icon>
      </IconContainer>
    </UniquePaymentContainer>
  );
};

// Form Steps
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
      
      <option value="loan">Loan Repayment</option>
      <option value="rd">RD Payment</option>
      <option value="fd">FD Payment</option>
      <option value="dep">Make Deposit</option>
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
  const [utrNumber, setUtrNumber] = useState('');
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
      <UniqueLabel htmlFor="utrNumber">Enter UTR Number:</UniqueLabel>
      <UniqueInput
        type="text"
        id="utrNumber"
        name="utrNumber"
        value={utrNumber}
        onChange={(e) => setUtrNumber(e.target.value)}
      />
      <UniqueButton type="button" onClick={handlePreviousStep} style={{ marginTop: '20px' }}>
        Back
      </UniqueButton>
      <UniqueButton type="button" onClick={() => handlePaymentSuccess()} style={{ marginTop: '20px' }}>
        Proceed to Step 4
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

  // Function to send email after Step 1
  const sendEmailStep1 = (data) => {
    const templateParams = {
      name: data.name,
      paymentType: data.paymentType,
      phoneNumber: data.phoneNumber,
      amount: data.amount,
      remarks: data.remarks,
    };

    send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID_STEP1', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
  };

  // Function to send email after Step 3 (Payment Confirmation)
  const sendEmailStep3 = (data) => {
    const templateParams = {
      name: data.name,
      amount: data.amount,
    };

    send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID_STEP3', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Payment email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Failed to send payment email:', error);
      });
  };

  const handleNextStep = () => {
    if (step === 1) {
      sendEmailStep1(formData); // Send email after Step 1
    }
    setStep(step + 1);
  };

  const handlePaymentSuccess = () => {
    sendEmailStep3(formData); // Send email after Step 3
    setStep(4); // Move to Step 4
  };

  const handlePreviousStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        />
      )}
      {step === 4 && <Step4 />}
    </UniqueFormContainer>
  );
};

// PaymentForm component wrapping everything
const PaymentForm = () => {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <ContentWrapper>
        <BlurOverlay />
        <FormManager />
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
      {openModal.state && (
        <Expand openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </PageContainer>
  );
};

export default PaymentForm;