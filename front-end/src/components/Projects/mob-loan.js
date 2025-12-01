import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery
import { motion } from 'framer-motion'; // Import framer-motion
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
  padding: 2rem 1rem; // Adjust padding for mobile
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; // Space between cards
  width: 100%;
    margin-top:10vh;
`;

const ProjectTitle = styled.h2`
  font-weight: bold;
  color: white;
  font-size: 4vw; // Responsive font size
  text-align: center;
  margin: 1rem 0;
`;

const ProjectRow = styled.div`
  display: flex;
  flex-direction: column; // Stack vertically for mobile
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  max-width: 100%; // Ensure it doesn’t exceed card width
  overflow: hidden; // Prevent overflow
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  object-fit: cover; 
`;

const Button = styled.a`
  display: block;
  padding: 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-align: center;
  text-decoration: none;
  margin-top: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const NewProjectsPage = ({ openModal, setOpenModal }) => {
  const [newProjects, setNewProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newServicesTitle, setNewServicesTitle] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if mobile resolution

  useEffect(() => {
    const fetchNewProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'loans'));
        const fetchedProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNewProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching new projects:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchNewServicesTitle = async () => {
      try {
        const docRef = doc(db, 'title-loan', 'loanText');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNewServicesTitle(docSnap.data().text);
        }
      } catch (error) {
        console.error('Error fetching new services title:', error);
      }
    };

    fetchNewProjects();
    fetchNewServicesTitle();
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
    <Container id="projects">
      <CardContainer>
        <motion.div
          key="unique-id-1"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <ProjectTitle>{newServicesTitle}</ProjectTitle>
        </motion.div>

        {newProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectRow>
              <Image src={project.image || 'https://via.placeholder.com/300'} alt={project.title} />
              <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem' }}>
                {project.description}
              </Typography>
              <Button href={project.webapp || "/payment"} target="_self">Make Repayment</Button>
            </ProjectRow>
          </motion.div>
        ))}
      </CardContainer>
    </Container>
  );
};

export default NewProjectsPage;