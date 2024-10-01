import React, { useState } from 'react';
import './EMICalculator.css';  // You can style your component here

const INR_TO_USD_EXCHANGE_RATE = 75; // Exchange rate: 1 USD = 75 INR

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(25000 * INR_TO_USD_EXCHANGE_RATE);
  const [interestRate, setInterestRate] = useState(9);
  const [loanTenure, setLoanTenure] = useState(14);
  const [emi, setEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const calculateEMI = () => {
    const principal = loanAmount / INR_TO_USD_EXCHANGE_RATE; // Convert back to USD for calculation
    const rate = interestRate / 12 / 100;
    const tenure = loanTenure;

    const emi =
      (principal * rate * Math.pow(1 + rate, tenure)) /
      (Math.pow(1 + rate, tenure) - 1);

    const totalPayment = emi * tenure * INR_TO_USD_EXCHANGE_RATE;
    const totalInterest = totalPayment - loanAmount;

    setEmi(emi.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
  };

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  React.useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  return (
    <div className={`emi-calculator ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <h2>Your EMI is ₹{emi} per month</h2>
      <div className="breakdown">
        <div>Principal Amount: ₹{loanAmount}</div>
        <div>Interest Payable: ₹{totalInterest}</div>
        <div>Total Payment: ₹{totalPayment}</div>
      </div>
      <div className="slider-container">
        {/* Your slider inputs */}
      </div>
      <button onClick={handleSidebarClick}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      {isSidebarOpen && <MiniCalculator />}
    </div>
  );
};

const MiniCalculator = () => {
  // Mini calculator component
};

export default EMICalculator;
