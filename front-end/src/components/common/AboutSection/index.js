import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import depositImage from '../../../images/deposit.jpg';
import loanImage from '../../../images/loan.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 50;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  will-change: transform;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 49;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: grey;
  
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 1050px;
  text-align: justify;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 300px;
  }
`;

const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`;

const ServiceCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid transparent;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    max-width: 400px;
  }
  
  @media (max-width: 500px) {
    max-width: 330px;
  }
`;

const ServiceImage = styled.img`
  width: 100%;   
  height: 100%; 
  object-fit: cover;
`;

const ActionButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.3;
  }
`;

const AboutSection = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      image: depositImage,
      alt: 'Deposit Services',
      buttonText: 'Apply Now',
      onClick: () => navigate('/deposit')
    },
    {
      id: 2,
      image: loanImage,
      alt: 'Loan Services',
      buttonText: 'Make Repayment',
      onClick: () => navigate('/payment')
    }
  ];

  return (
    <Container id="about">
      <Wrapper>
        <Title>About</Title>
        <Description>
          Supreet Souharda Society, your friendly neighborhood Souharda Society in Kelginoor,
          Honnavar, is committed to empowering our members and the community. We offer a variety of 
          accounts, fixed deposits, and loans, alongside membership benefits and a focus on supporting 
          local growth. Join us and experience the difference Souharda Society can make!
        </Description>
        
        <ServicesContainer>
          {services.map((service) => (
            <ServiceCard key={service.id}>
              <ServiceImage src={service.image} alt={service.alt} />
              <ActionButton onClick={service.onClick}>
                {service.buttonText}
              </ActionButton>
            </ServiceCard>
          ))}
        </ServicesContainer>
      </Wrapper>
    </Container>
  );
};

export default AboutSection;