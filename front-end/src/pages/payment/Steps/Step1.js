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

  // Validate phone number and payment type
  const isFormValid = () => {
    return formData.phoneNumber && formData.paymentType; // Validate that phoneNumber and paymentType are not empty
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      handleChange(e); // Update parent formData only if the value is valid
    }
  };

  const handleNext = () => {
    // If form is invalid, return early
    if (!isFormValid()) {
      alert("Please fill in all required fields (Phone number and Payment type)."
      );
      return;
    }
    handleNextStep(); // Proceed to the next step
  };

  return (
    <UniqueFormStep>
      <h2>Enter Details</h2>

      {/* Name field */}
      <UniqueLabel htmlFor="name">Name:</UniqueLabel>
      <UniqueInput
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange} // Ensure this is updating formData correctly
      />
      
      {/* Payment Type dropdown */}
      <UniqueLabel htmlFor="paymentType">Payment Type:</UniqueLabel>
      <UniqueSelect
        id="paymentType"
        name="paymentType"
        value={formData.paymentType}
        onChange={handleChange}
        disabled={loading} // Disable if loading is true
      >
        <option value="" disabled>Select Payment Type</option> {/* Placeholder option */}
        <option value="loan">Loan Repayment</option>
        <option value="rd">RD Payment</option>
        <option value="fd">FD Payment</option>
        <option value="dep">Make Deposit</option>
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

      {/* Amount field */}
      <UniqueLabel htmlFor="amount">Amount:</UniqueLabel>
      <UniqueInput
        type="number"
        id="amount"
        name="amount"
        value={formData.amount}
        onChange={handleAmountChange} // Use custom handler to prevent negative values
      />

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
