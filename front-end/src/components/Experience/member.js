import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Heading = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: white;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;



const MemberCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.25rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 1.25rem;
`;

const GradientRing = styled.div`
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3px;
`;

const ImageInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #000;
  overflow: hidden;
`;

const MemberImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${MemberCard}:hover & {
    transform: scale(1.1);
  }
`;

const MemberName = styled.h3`
  font-family: 'Inter', sans-serif;
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  text-align: center;
  letter-spacing: 0.025em;
  transition: color 0.3s ease;
  
  ${MemberCard}:hover & {
    color: #a5b4fc;
  }
`;

const MemberRole = styled.p`
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
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
  const executives = teamMembers.slice(0, 4);
  const directors = teamMembers.slice(4);
  
  return (
    <Container>
      <Heading>Leadership Team</Heading>
      
      <TeamGrid>
        {executives.map((member) => (
          <MemberCard key={member.id}>
            <ImageWrapper>
              <GradientRing>
                <ImageInner>
                  <MemberImage src={member.image} alt={member.name} />
                </ImageInner>
              </GradientRing>
            </ImageWrapper>
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
          </MemberCard>
        ))}
      </TeamGrid>
      
      <Heading>Board of Directors</Heading>
      
      <TeamGrid>
        {directors.map((member) => (
          <MemberCard key={member.id}>
            <ImageWrapper>
              <GradientRing>
                <ImageInner>
                  <MemberImage src={member.image} alt={member.name} />
                </ImageInner>
              </GradientRing>
            </ImageWrapper>
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
          </MemberCard>
        ))}
      </TeamGrid>
    </Container>
  );
};

export default Team;