import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@mui/material';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

const Container = styled.div`
  padding: 9rem 0;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Heading = styled.h2`
  font-weight: bold;
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
  width: 200px;
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
  font-size: 1.2em;
  color: #333;
  white-space: nowrap;
`;

const MemberRole = styled.p`
  margin: 0;
  font-size: 1em;
  color: #777;
`;

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'members'));
        const fetchedMembers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMembers(fetchedMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress color="secondary" />
        <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>Please wait...</Typography>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Heading>Management Team</Heading>
        <TeamContainer>
          {members.map((member) => (
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
