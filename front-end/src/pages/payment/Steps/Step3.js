import React, { useState, useEffect } from 'react';
import Payment from '../Payment';
import { UniqueFormStep, UniqueButton } from '../StyledComponents';
import emailjs from 'emailjs-com';

const Step3 = ({ formData, handlePreviousStep, setStep, handleChange }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(true); // To control the timer state
  const [utrNumber, setUtrNumber] = useState(formData.utrNumber || ''); // UTR number state

  // Function to format the time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // UseEffect to start the countdown timer
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval); // Stop the timer when it reaches zero
          return 0;
        }
        return prevTime - 1; // Decrement the time
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isTimerRunning]);

  // Handle UTR number change (update both local state and formData)
  const handleUTRChange = (event) => {
    const value = event.target.value;
    setUtrNumber(value); // Update local state for UTR number
    handleChange({ target: { name: 'utrNumber', value } }); // Sync UTR number with parent formData
  };

  // Handle UTR payment completion, which sends the email and proceeds to the next step
  const handleUTRPaymentComplete = () => {
    setIsTimerRunning(false); // Stop the timer when UTR payment is complete
    setStep(4); // Proceed to the next step

    // Send email using EmailJS after payment is complete
    const templateParams = {
      name: formData.name, // User's name
      phone: formData.phoneNumber, // User's phone number
      remarks: formData.remarks, // Any remarks the user entered
      paymentType: formData.paymentType, // Payment type (e.g., UPI)
      amount: formData.amount, // Amount to be paid
      utrNumber: utrNumber, // UTR Number entered by the user
      message: `Payment initiated via UTR. Please verify.`, // Custom message
    };

    // Send the email using EmailJS
    emailjs.send('service_t5bh5t6', 'template_k13hxez', templateParams, 'w5fGLVI0VKb3QrOkW')
      .then((response) => {
        console.log('Email sent successfully!', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  // Existing handlePaymentComplete for UPI payment
  const handlePaymentComplete = () => {
    setIsTimerRunning(false); // Stop the timer when payment is complete
    setStep(3); // Proceed to the next step
    // No email for UPI payment here, just navigate to Step 4
  };

  return (
    <UniqueFormStep style={{ textAlign: 'center' }}>
      {/* Display the formatted timer with red color and large font */}
      <h2 style={{ color: 'red', fontSize: '28px' }}>{formatTime(timeLeft)}</h2>

      {/* Payment component (UPI payment) */}
      <Payment upiID="supreetsouharda@kbl" amount={formData.amount} onPaymentComplete={handlePaymentComplete} />

      {/* UTR Input Field */}
      <label htmlFor="utr-number" style={{ fontWeight: 'bold', display: 'block', marginTop: '15px' }}>
        Enter UTR Number:
      </label>
      <input
        id="utr-number"
        type="text"
        name="utrNumber"
        placeholder="Enter UTR Number"
        value={utrNumber} // Bind to utrNumber state
        onChange={handleUTRChange} // Handle UTR input change
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '5px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          backgroundColor: '#f9f9f9',
        }}
      />

      {/* Note about UTR */}
      <p style={{
        fontSize: '14px',
        color: '#888',
        marginTop: '8px',
        textAlign: 'center',
        fontStyle: 'italic',
      }}>
        Please enter the UTR number to help identify the payment easily. This is optional but recommended for better tracking.
      </p>

      {/* Button to confirm payment via UTR */}
      <UniqueButton type="button" onClick={handleUTRPaymentComplete} style={{ marginTop: '20px', background: 'green', color: 'white' }}>
        Confirm Payment (via UTR)
      </UniqueButton>

      {/* Button to go back */}
      <UniqueButton type="button" onClick={handlePreviousStep}>
        Back
      </UniqueButton>
    </UniqueFormStep>
  );
};

export default Step3;