import depositImage from '../images/deposit.jpg';
import loanImage from '../images/loan.jpg';

// Banking services configuration
export const BANKING_SERVICES = [
  {
    id: 'deposit',
    title: 'Deposit Services',
    description: 'Secure your future with our flexible deposit schemes',
    image: depositImage,
    buttonText: 'Apply Now',
    route: '/deposit',
    features: [
      'Fixed Deposits',
      'Recurring Deposits',
      'Competitive Interest Rates',
      'Flexible Terms'
    ]
  },
  {
    id: 'loan',
    title: 'Loan Services',
    description: 'Get financial support for your dreams and needs',
    image: loanImage,
    buttonText: 'Make Repayment',
    route: '/payment',
    features: [
      'Personal Loans',
      'Home Loans',
      'Business Loans',
      'Easy EMI Options'
    ]
  }
];

// Service categories
export const SERVICE_CATEGORIES = {
  DEPOSITS: 'deposits',
  LOANS: 'loans',
  ACCOUNTS: 'accounts',
  INSURANCE: 'insurance',
  DIGITAL: 'digital'
};

export default BANKING_SERVICES;