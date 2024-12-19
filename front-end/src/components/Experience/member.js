import React from 'react';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@mui/material';

// Styled components
const Container = styled.div`
  
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Heading = styled.h2`
  font-weight: bold;
  color: white;
  text-align: center; /* Centers the text */
  font-size: 2rem; /* Adjust font size as needed */
    padding-bottom: 3rem;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 210px; /* Increased from 200px to 240px */
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;
const MemberImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const MemberName = styled.h3`
  margin: 10px 0 5px;
  font-size: 0.99em;
  color: #333;
  white-space: nowrap;
`;

const MemberRole = styled.p`
  margin: 0;
  font-size: 0.8em;
  color: #777;
`;
const teamMembers = [

  {
    id: 1,
    name: 'Thomas Thome Horta',
    role: 'President',
    image: require('../../images/members/Thomas-horta.jpeg'), // Replace with the actual image path
  },
  {
    id: 2,
    name: 'James A Rodrigues',
    role: 'Vice President',
    image: require('../../images/members/James-rodrigues.jpeg'), // Replace with the actual image path
  },
  {
    id: 3,
    name: 'Santiag Thome Horta',
    role: 'Founder',
    image: require('../../images/members/Santaig-horta.jpeg'), // Replace with the actual image path
  },
  {
    id: 4,
    name: 'Sohan Santiag Horta',
    role: 'General Manager',
    image: require('../../images/members/Sohan-s-horta.jpeg'), // Replace with the actual image path
  },
  {
    id: 5,
    name: 'Suryakanth M S',
    role: 'Director',
    image: require('../../images/members/Suryakanth.jpeg'), // Replace with the actual image path
  },
  {
    id: 6,
    name: 'Gajanana S Naik',
    role: 'Director',
    image: require('../../images/members/Gajanana.jpeg'), // Replace with the actual image path
  },
  {
    id: 7,
    name: 'Lalitha S Tandel',
    role: 'Director',
    image: require('../../images/members/Lalitha.jpeg'), // Replace with the actual image path
  },
  {
    id: 8,
    name: 'Shivu Shivu Mukri',
    role: 'Director',
    image: require('../../images/members/s-s-mukri.jpeg'), // Replace with the actual image path
  },
  {
    id: 9,
    name: "Bastian D'souza",
    role: 'Director',
    image: require('../../images/members/Bastav.jpeg'), // Replace with the actual image path
  },
  {
    id: 10,
    name: 'Natholin T Horta',
    role: 'Director',
    image: require('../../images/members/Natholin.jpeg'), // Replace with the actual image path
  },
  {
    id: 11,
    name: 'James J Fernandes',
    role: 'Director',
    image: require('../../images/members/James-Fernandes.jpeg'), // Replace with the actual image path
  },
  {
    id: 12,
    name: 'Gracy J Fernandes',
    role: 'Director',
    image: require('../../images/members/Gracy-Fernandes.jpeg'), // Replace with the actual image path
  },
  {
    id: 13,
    name: 'Leena F Fernandes',
    role: 'Director',
    image: require('../../images/members/Leena-fernandes.jpeg'), // Replace with the actual image path
  },
  {
    id: 14,
    name: 'Felix S Fernandes',
    role: 'Director',
    image: require('../../images/members/Felix-fernandes.jpeg'), // Replace with the actual image path
  },
  {
    id: 15,
    name: 'Severina J Rodrigues',
    role: 'Director',
    image: require('../../images/members/Severina-rodrigues.jpeg'), // Replace with the actual image path
  },
  {
    id: 16,
    name: 'Glancy G Fernandes',
    role: 'Director',
    image: require('../../images/members/Glacy-fernandes.jpeg'), // Replace with the actual image path
  },
  {
    id: 17,
    name: 'Lawrence D Leema',
    role: 'Director',
    image: require('../../images/members/Lawrance.jpeg'), // Replace with the actual image path
  },
  {
    id: 18,
    name: 'Prakash D V',
    role: 'Director',
    image: require('../../images/members/Prakash-av.jpeg'), // Replace with the actual image path
  },
];

const Team = () => {
  return (
    <Container>
      <Wrapper>
        <Heading>Management Team</Heading>
        <TeamContainer>
          {teamMembers.map((member) => (
            <MemberCard key={member.id}>
              <MemberImage src={member.image} alt={member.name} />
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
            </MemberCard>
          ))}
        </TeamContainer>
      </Wrapper>
    </Container>
  );
};

export default Team;