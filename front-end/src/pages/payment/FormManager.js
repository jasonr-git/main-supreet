import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { QRCodeSVG } from 'qrcode.react';
import bgImage from '../../images/bg2.avif';

const UniqueFormContainer = styled.div`
  width: 90%;
  max-width: 900px;
  padding: 40px;
  margin: 20px auto;
  border-radius: 20px;
  margin-top: 10rem;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', 'Poppins', sans-serif;

  @media (max-width: 768px) {
    margin-top: 6rem;
    padding: 30px;
  }

  @media (max-width: 576px) {
    margin-top: 6rem;
    padding: 20px;
  }
`;

const UniqueFormStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const UniqueInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
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
  &:hover {
    background: linear-gradient(90deg, #0056b3 0%, #003f88 100%);
    transform: translateY(-2px);
  }
`;

const SplitContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 24px 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentBox = styled.div`
  background: #f8fafc;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const QRWrapper = styled.div`
  margin: 20px auto;
  padding: 12px;
  background: white;
  display: inline-block;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`;

const CopyRow = styled.div`
  margin-bottom: 16px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.white ? '#ffffff' : '#64748b'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const CopyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
`;

const CopyValue = styled.span`
  font-family: 'Courier New', monospace;
  color: #1e293b;
  font-weight: 600;
  user-select: all;
`;

const CopyIcon = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  &:hover {
    color: #1d4ed8;
  }
`;

const AmountBadge = styled.div`
  background: #10b981;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 18px;
  display: inline-block;
  margin-bottom: 16px;
`;

const UPIPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 12px 16px;
  margin: 16px auto;
  max-width: 320px;
`;

const BRANCHES = {
  Kelginoor: { upi: 'supreetsouharda@kbl', account: '2912500100346801', ifsc: 'KARB0000291', bank: 'Karnataka Bank', accountName: 'Supreet Souharda Co Operative Society Ltd' },
  Honnavar: { upi: 'vyapar.170854471658@hdfcbank', account: '99908088827357', ifsc: 'HDFC0004156', bank: 'HDFC Bank', accountName: 'Supreet Souharda Co-Op Society Ltd' },
  Kavalakki: { upi: 'supreetsouharda@cnrb', account: '120037360801', ifsc: 'CNRB0008803', bank: 'CANARA BANK', accountName: 'Supreet Souharda Co-operative Society Ltd Kelginoor Br- Kavalakki' }
};

const FormManager = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', paymentType: '', amount: '', branch: ''
  });
  const [utr, setUtr] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (formData.name && formData.phone && formData.email && formData.paymentType && formData.amount && formData.branch) {
      setStep(2);
    } else {
      alert('Please fill all fields');
    }
  };

  const handleConfirm = async () => {
    if (!utr) {
      alert('Please enter UTR/Transaction number');
      return;
    }

    try {
      await emailjs.send(
        'service_t5bh5t6',
        'template_k13hxez',
        {
          to_email: 'bank@supreetsouharda.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          payment_type: formData.paymentType,
          amount: formData.amount,
          branch: formData.branch,
          utr: utr
        },
        'w5fGLVI0VKb3QrOkW'
      );
      setStep(3);
    } catch (error) {
      alert('Failed to send confirmation');
    }
  };

  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const branch = BRANCHES[formData.branch];

  return (
    <UniqueFormContainer>
      {step === 1 && (
        <UniqueFormStep>
          <h2>Make a Payment</h2>
          <UniqueInput type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <UniqueInput type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <UniqueInput type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <UniqueSelect name="paymentType" value={formData.paymentType} onChange={handleChange}>
            <option value="">Select Payment Type</option>
            <option value="Recurring Deposit">Recurring Deposit</option>
            <option value="Loan Repayment">Loan Repayment</option>
            <option value="Fixed Deposit">Fixed Deposit</option>
            <option value="Other">Other</option>
          </UniqueSelect>
          <UniqueInput type="number" name="amount" placeholder="Amount (₹)" value={formData.amount} onChange={handleChange} />
          <UniqueSelect name="branch" value={formData.branch} onChange={handleChange}>
            <option value="">Select Branch</option>
            <option value="Kelginoor">Kelginoor</option>
            <option value="Honnavar">Honnavar</option>
            <option value="Kavalakki">Kavalakki</option>
          </UniqueSelect>
          <UniqueButton onClick={handleNext}>Next</UniqueButton>
        </UniqueFormStep>
      )}

      {step === 2 && branch && (
        <UniqueFormStep>
          <h2 style={{ marginBottom: '24px', color: '#1e293b' }}>Complete Payment</h2>
          <SplitContainer>
            <PaymentBox style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '16px' }}>Pay via UPI</h3>
              <QRWrapper>
                <QRCodeSVG value={`upi://pay?pa=${branch.upi}&pn=Supreet Souharda&am=${formData.amount}&cu=INR`} size={200} />
              </QRWrapper>
              <UPIPill>
                <CopyValue style={{ fontSize: '14px' }}>{branch.upi}</CopyValue>
                <CopyIcon onClick={() => copyToClipboard(branch.upi, 'upi')}>
                  {copied === 'upi' ? '✓' : '📋'}
                </CopyIcon>
              </UPIPill>
            </PaymentBox>
            <PaymentBox>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e293b', margin: 0 }}>Bank Details</h3>
                <AmountBadge>₹{formData.amount}</AmountBadge>
              </div>
              <CopyRow>
                <Label>Bank Name</Label>
                <CopyBox>
                  <CopyValue>{branch.bank}</CopyValue>
                </CopyBox>
              </CopyRow>
              {branch.accountName && (
                <CopyRow>
                  <Label>Account Name</Label>
                  <CopyBox>
                    <CopyValue style={{ fontSize: '13px' }}>{branch.accountName}</CopyValue>
                  </CopyBox>
                </CopyRow>
              )}
              <CopyRow>
                <Label>Account Number</Label>
                <CopyBox>
                  <CopyValue>{branch.account}</CopyValue>
                  <CopyIcon onClick={() => copyToClipboard(branch.account, 'account')}>
                    {copied === 'account' ? '✓' : '📋'}
                  </CopyIcon>
                </CopyBox>
              </CopyRow>
              <CopyRow>
                <Label>IFSC Code</Label>
                <CopyBox>
                  <CopyValue>{branch.ifsc}</CopyValue>
                  <CopyIcon onClick={() => copyToClipboard(branch.ifsc, 'ifsc')}>
                    {copied === 'ifsc' ? '✓' : '📋'}
                  </CopyIcon>
                </CopyBox>
              </CopyRow>
              <CopyRow>
                <Label>Branch</Label>
                <CopyBox>
                  <CopyValue>{formData.branch}</CopyValue>
                </CopyBox>
              </CopyRow>
            </PaymentBox>
          </SplitContainer>
          <div style={{ marginTop: '24px' }}>
            <Label white>Transaction ID / UTR Number</Label>
            <UniqueInput type="text" placeholder="Enter UTR/Transaction Number" value={utr} onChange={(e) => setUtr(e.target.value)} style={{ marginBottom: '12px' }} />
          </div>
          <UniqueButton onClick={handleConfirm} style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)' }}>Verify & Confirm</UniqueButton>
        </UniqueFormStep>
      )}

      {step === 3 && (
        <UniqueFormStep style={{ textAlign: 'center' }}>
          <h2>✓ Payment Confirmation Sent!</h2>
          <p>We'll verify your payment and contact you shortly.</p>
          <UniqueButton onClick={() => { setStep(1); setFormData({ name: '', phone: '', email: '', paymentType: '', amount: '', branch: '' }); setUtr(''); }}>
            Make Another Payment
          </UniqueButton>
        </UniqueFormStep>
      )}
    </UniqueFormContainer>
  );
};

export default FormManager;
