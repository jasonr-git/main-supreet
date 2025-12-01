import React from 'react';
import { UniqueFormStep, UniqueButton } from '../StyledComponents';

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

export default Step2;