import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ProjectCard from '../Cards/other';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

const Container = styled.div`
  padding: 9rem 0;
  @media (max-width: 600px) {
    padding: 4rem 0;  // Reduce padding for mobile
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  @media (max-width: 600px) {
    padding: 0 10px;  // Adjust padding for mobile
  }
`;

const Title = styled.h2`
  font-weight: bold;
  color: #E5E5E5;
  font-size: 50px;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
  @media (max-width: 600px) {
    font-size: 36px;  // Adjust font size for mobile
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectRow = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;  // Stack items vertically on mobile
  }
`;

const Details = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.4);
  color: #f3f3f3;
  backdrop-filter: blur(10px);
  margin-left: ${({ align }) => (align === 'right' ? '2%' : '2%')};
  margin-right: ${({ align }) => (align === 'left' ? '2%' : '0')};
  height: 270px;
  padding: 3% 2% 3% 3%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: left;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.3);
    filter: brightness(1.1);
  }

  @media (max-width: 600px) {
    height: auto;  // Allow height to adjust automatically on mobile
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1rem;  // Add spacing between stacked items
    padding: 5%;  // Adjust padding for mobile
  }
`;

const TextOverflow = styled.div`
  display: -webkit-box; 
  -webkit-line-clamp: 5; /* number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    -webkit-line-clamp: 3;  // Show fewer lines of text on mobile
  }
`;

const AdditionalProjectsPage = ({ openModal, setOpenModal }) => {
  const [additionalProjects, setAdditionalProjects] = useState([]);
  const [toggle, setToggle] = useState('all');
  const [loading, setLoading] = useState(true);
  const [additionalServicesTitle, setAdditionalServicesTitle] = useState('');

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchAdditionalProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'other-services'));
        const fetchedProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAdditionalProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching additional projects:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAdditionalServicesTitle = async () => {
      try {
        const docRef = doc(db, 'title-others', 'otherText');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAdditionalServicesTitle(docSnap.data().text);
        }
      } catch (error) {
        console.error('Error fetching additional services title:', error);
      }
    };

    fetchAdditionalProjects();
    fetchAdditionalServicesTitle();
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
      <Wrapper>
        <Title>{additionalServicesTitle}</Title>
        <CardContainer>
          {additionalProjects
            .filter((item) => toggle === 'all' || item.category === toggle)
            .map((project) => (
              <motion.div
                key={project.id}
                initial={{ x: project.position === 'right' ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <ProjectRow style={{ flexDirection: isMobile ? 'column' : project.position === 'right' ? 'row-reverse' : 'row' }}>
                  <Details align={project.position === 'right' ? 'right' : 'left'}>
                    <Typography className="title" variant="h4" component="div" style={{ fontWeight: 'bold' }}>{project.title}</Typography>
                    <br />
                    <TextOverflow>
                      <Typography className="subheading" variant="body1" component="div" sx={{ fontWeight: '570 !important' }}>{project.description}</Typography>
                    </TextOverflow>
                    <Typography className="sub" variant="body2" color="textSecondary" sx={{ textAlign: 'justify' }}>{project.date}</Typography>
                  </Details>
                  <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal} />
                </ProjectRow>
              </motion.div>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default AdditionalProjectsPage;
