import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import ProjectCard from '../Cards/GalleryCard';
import { Box, CircularProgress, Typography, IconButton } from '@mui/material';
import { styled as muiStyled } from '@mui/system';
import styled from 'styled-components';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// Styled Components
const LoadingContainer = muiStyled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  flexDirection: 'column',
});

const Container = styled.div`
  background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
  display: flex;
  margin-top: 10rem; 
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1350px;
  padding: 10px;
  gap: 20px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Title = styled(Typography)`
  font-size: 2rem;
  color: #843bce;
`;

const Description = styled(Typography)`
  font-size: 1.2rem;
  color: #555;
`;

const CardContainer = styled.div`
  flex: 2;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 8px;
  position: relative;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ArrowButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #843bce;
  z-index: 2;
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
`;

const Projects = ({ openModal, setOpenModal }) => {
  const [projects, setProjects] = useState([]);
  const [toggle, setToggle] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        const fetchedProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>Please wait...</Typography>
      </LoadingContainer>
    );
  }

  return (
    <Container id="projects">
      <Wrapper>
        <InfoContainer>
          <Title variant="h2">Our Projects</Title>
          <Description variant="body1">Explore our diverse range of projects, showcasing our expertise and creativity in various fields.</Description>
        </InfoContainer>
        <CardContainer>
          {projects.length > 0 && (
            <>
              <ArrowButton className="left" onClick={handlePrev}>
                <ArrowBackIos />
              </ArrowButton>
              <ProjectCard project={projects[currentIndex]} openModal={openModal} setOpenModal={setOpenModal} />
              <ArrowButton className="right" onClick={handleNext}>
                <ArrowForwardIos />
              </ArrowButton>
            </>
          )}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
