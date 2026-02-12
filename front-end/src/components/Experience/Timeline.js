import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const TimelineTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TimelineWrapper = styled.div`
  position: relative;
  padding-left: 3rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  }
  
  @media (max-width: 768px) {
    padding-left: 2rem;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 3rem;
  
  &::before {
    content: '';
    position: absolute;
    left: -3.5rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
  }
  
  @media (max-width: 768px) {
    &::before {
      left: -2.5rem;
    }
  }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(0.5rem);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const DateBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
`;

const MilestoneTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const MilestoneDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const Timeline = () => {
  const milestones = [
    {
      date: 'Aug 19, 2020',
      title: 'The Beginning',
      description: 'Registered under Karnataka Souharda Sahakari Act 1997, marking the foundation of our cooperative society.'
    },
    {
      date: 'Dec 4, 2020',
      title: 'Grand Opening',
      description: 'Inaugurated by President Thomas T. Horta, officially opening our doors to serve the community.'
    },
    {
      date: '2022',
      title: 'Honnavar Branch Opening',
      description: 'Expanded our services by opening a new branch in Honnavar to better serve our growing community.'
    },
    {
      date: '2023',
      title: 'Kavalakki Branch Opening',
      description: 'Further expanded our reach with the opening of our Kavalakki branch, bringing banking services closer to more families.'
    }
  ];

  return (
    <TimelineContainer>
      <TimelineTitle>Our Journey</TimelineTitle>
      <TimelineWrapper>
        {milestones.map((milestone, index) => (
          <TimelineItem key={index}>
            <GlassCard>
              <DateBadge>{milestone.date}</DateBadge>
              <MilestoneTitle>{milestone.title}</MilestoneTitle>
              <MilestoneDesc>{milestone.description}</MilestoneDesc>
            </GlassCard>
          </TimelineItem>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
};

export default Timeline;
