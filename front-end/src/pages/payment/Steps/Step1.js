import React, { useState } from 'react';
import {
  UniqueFormStep,
  UniqueLabel,
  UniqueInput,
  UniqueSelect,
  UniqueTextarea,
  UniqueButton,
} from '../StyledComponents';

const Step1 = ({ formData, handleChange, handleNextStep }) => {
  const [loading, setLoading] = useState(false); // State to manage the loading state

  // Validate required fields
  const isFormValid = () => {
    return formData.phoneNumber && formData.paymentType && formData.email && formData.branch;
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      handleChange(e); // Update parent formData only if the value is valid
    }
  };

  const handleNext = () => {
    if (!isFormValid()) {
      alert("Please fill in all required fields.");
      return;
    }
    handleNextStep();
  };

  return (
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

      <UniqueLabel htmlFor="email">Email:</UniqueLabel>
      <UniqueInput
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        disabled={loading}
      />
      
      <UniqueLabel htmlFor="paymentType">Payment Type:</UniqueLabel>
      <UniqueSelect
        id="paymentType"
        name="paymentType"
        value={formData.paymentType}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="" disabled>Select Payment Type</option>
        <option value="Recurring Deposit">Recurring Deposit</option>
        <option value="Loan Repayment">Loan Repayment</option>
        <option value="Fixed Deposit">Fixed Deposit</option>
        <option value="Other">Other</option>
      </UniqueSelect>

      {/* Phone Number field */}
      <UniqueLabel htmlFor="phoneNumber">Phone Number:</UniqueLabel>
      <UniqueInput
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        value={formData.phoneNumber} // The value of phoneNumber is tied to formData
        onChange={handleChange} // Ensure this is updating formData correctly
        disabled={loading} // Disable if loading is true
      />

      <UniqueLabel htmlFor="amount">Amount:</UniqueLabel>
      <UniqueInput
        type="number"
        id="amount"
        name="amount"
        value={formData.amount}
        onChange={handleAmountChange}
      />

      <UniqueLabel htmlFor="branch">Branch:</UniqueLabel>
      <UniqueSelect
        id="branch"
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="" disabled>Select Branch</option>
        <option value="Mangalore">Mangalore</option>
        <option value="Kasaragod">Kasaragod</option>
        <option value="Kavalakki">Kavalakki</option>
      </UniqueSelect>

      {/* Remarks field */}
      <UniqueLabel htmlFor="remarks">Remarks:</UniqueLabel>
      <UniqueTextarea
        id="remarks"
        name="remarks"
        value={formData.remarks}
        onChange={handleChange}
      />

      {/* Submit Button */}
      <UniqueButton 
        type="button" 
        onClick={handleNext} 
        disabled={loading} // Disable button when email is being sent
      >
        {loading ? (
          <span>Please wait...</span> // Change button text to "Please wait..." when loading
        ) : (
          <span>Next</span> // Normal button text when not loading
        )}
      </UniqueButton>
    </UniqueFormStep>
  );
};

export default Step1;
