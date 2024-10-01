import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 330px;
  height: 275px;
  background-color: white;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.3);
    filter: brightness(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  object-fit: cover; /* Ensures the image covers the entire container */
  
`;


const Button = styled.a`
  display: block;
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
   background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.white};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-top: auto;
  text-decoration: none;
  transition: background 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
`;

const ProjectCards = ({ project, openModal, setOpenModal }) => {
  return (
    <Card onClick={() => setOpenModal({ state: true, project: project })}>
      <Image src={project.image} />
      <Button href={project.webapp} >
        MAKE REPAYMENT
      </Button>
    </Card>
  );
};

export default ProjectCards;
