import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BANKING_SERVICES } from '../../constants/services';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 50;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
`;

const ServicesGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ServiceCard = styled(Card)`
  position: relative;
  height: 300px;
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ServiceCard}:hover & {
    transform: scale(1.1);
  }
`;

const ServiceContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 2rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const ServiceDescription = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
`;

const ActionButton = styled(Button)`
  align-self: flex-start;
  margin-top: 0.5rem;
`;

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <Container id="services">
      <Wrapper>
        <Title>Our Banking Services</Title>
        <Description>
          Supreet Souharda Society, your friendly neighborhood cooperative in Kelginoor,
          Honnavar, is committed to empowering our members and the community. We offer a variety of 
          accounts, fixed deposits, and loans, alongside membership benefits and a focus on supporting 
          local growth. Join us and experience the difference cooperative banking can make!
        </Description>
        
        <ServicesGrid>
          {BANKING_SERVICES.map((service) => (
            <ServiceCard key={service.id}>
              <ServiceImage src={service.image} alt={service.title} />
              <ServiceContent>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ActionButton 
                  variant="primary" 
                  size="small"
                  onClick={() => navigate(service.route)}
                >
                  {service.buttonText}
                </ActionButton>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Wrapper>
    </Container>
  );
};

export default ServicesSection;