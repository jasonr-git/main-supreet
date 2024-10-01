import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import skillImage1 from '../../images/deposit.jpg';
import skillImage2 from '../../images/loan.jpg';

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
  z-index:49;
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

const Title = styled.div`
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

const Desc = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 1050px;
  text-align: justify;
  margin: 0 auto; /* Centers the container */
  
  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 300px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`;

const Skill = styled.div`
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
  position: relative; /* Added to allow absolute positioning of the button */
  @media (max-width: 768px) {
    max-width: 400px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
  }
`;

const SkillImage = styled.img`
  width: 100%;   
  height: 100%; 
  object-fit: cover;
  loading: lazy;
`;

const Button = styled.button`
  position: absolute; /* Position the button absolutely within the Skill container */
  bottom: 10px; /* Position from the bottom */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Adjust horizontal centering */
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


const Text = styled.div`

`;

const Skills = () => {
  const navigate = useNavigate();

  return (
    <Container id="skills">
      <Wrapper>
        <Title>About</Title>
        <Text>
        <Desc>
          Supreet Souharda Bank, your friendly neighborhood cooperative bank in Kellaginoor, Karnataka, is committed to empowering our members and the community. We offer a variety of accounts, fixed deposits, and loans, alongside membership benefits and a focus on supporting local growth. Join us and experience the difference cooperative banking can make!
        </Desc>
        </Text>
        <SkillsContainer>
          <Skill>
            <SkillImage src={skillImage1} alt="Skill 1" />
            <Button onClick={() => navigate('/deposit')}>Apply Now</Button>
          </Skill>
          <Skill>
            <SkillImage src={skillImage2} alt="Skill 2" />
            <Button onClick={() => navigate('/loan')}>Apply Now</Button>
          </Skill>
          {/* Add more skills as needed */}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
