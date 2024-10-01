import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import emailjs from 'emailjs-com';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const flipInY = keyframes`
  from {
    transform: rotateY(-180deg);
  }
  to {
    transform: rotateY(0deg);
  }
`;

const flipOutY = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 1px; /* Ensure 1px gap between edge and form on mobile */
  @media screen and (min-width: 768px) {
    padding: 0; /* Reset padding for larger screens */
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 7% auto; /* Center the form horizontally */
  padding-bottom: 20px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 20px;
`;

const ContactFormWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: auto;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  animation: ${({ flipped }) => (flipped ? flipOutY : flipInY)} 0.5s forwards;
  margin-top: 20px;
`;

const ContactFormFront = styled.div`
  position: absolute;
  width: 100%;
  backface-visibility: hidden;
`;

const ContactFormBack = styled.div`
  position: absolute;
  width: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const ContactForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Contact = () => {
  const formRef = useRef();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [flipped, setFlipped] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_t5bh5t6', 'template_ubxan2m', formRef.current, 'w5fGLVI0VKb3QrOkW')
      .then(
        (result) => {
          setAlertSeverity('success');
          setAlertMessage('Email sent successfully!');
          setAlertOpen(true);
          setFlipped(true);
          formRef.current.reset();
        },
        (error) => {
          setAlertSeverity('error');
          setAlertMessage('Failed to send email. Please try again later.');
          setAlertOpen(true);
          console.log(error.text);
        }
      );
  };

  const handleResend = () => {
    setFlipped(false); // Reset flipped state to false to flip the form back
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions</Desc>
        <ContactFormWrapper flipped={false}>
          <ContactFormFront>
            <ContactForm ref={formRef} onSubmit={handleSubmit}>
              <ContactTitle>Email Us</ContactTitle>
              <ContactInput type="email" name="from_email" placeholder="Your Email" required />
              <ContactInput type="text" name="from_name" placeholder="Your Name" required />
              <ContactInput type="text" name="subject" placeholder="Subject" required />
              <ContactInputMessage placeholder="Message" rows="4" name="message" required />
              <ContactButton type="submit" value="Send" />
            </ContactForm>
          </ContactFormFront>
          <ContactFormBack>
            
              <ContactButton go type="button" value="Resend" />
  
          </ContactFormBack>
        </ContactFormWrapper>
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;

