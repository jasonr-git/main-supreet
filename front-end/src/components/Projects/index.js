import React, { useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material'; 
import { motion } from 'framer-motion'; 
import Mobile from './Mobile'; 
import { projects } from './data';  // Importing the project data from data.js

// Styled components for the main page layout
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

const Container = styled.div`
  padding: 9rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: bold;
  color: white;
  font-size: 50px;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectRow = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  width: 1000px;  // Fixed width
  height: 270px;  // Fixed height
`;

const Details = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.4);
  color: #f3f3f3;
  backdrop-filter: blur(10px);
  margin-left: ${({ align }) => (align === 'right' ? '20px' : '0')};
  margin-right: ${({ align }) => (align === 'left' ? '20px' : '0')};
  height: 100%;  // Fill parent height
  padding: 3% 2% 0 3%; 
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
`;

const AdditionalBox = styled.div`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  height: auto;   // Fixed height
  width: 1000px;  // Match ProjectRow width
  margin-top: 10px; 
  padding: 10px; 
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;  
`;

const Card = styled.div`
  width: 330px;  // Fixed width
  height: 270px;  // Fixed height
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  object-fit: cover; 
`;

const Button = styled.a`
  display: block;
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-top: auto;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const TableStyles = styled.table`
  margin-Top:-10px;
  width: 100%;
  border-collapse: collapse;  // Ensures borders are merged
  border-radius: 0px;  // Curved edges
  overflow: hidden;  // Ensure the border radius is applied
  z-index:999;
  margin-left:-5px;
`;

const TableHeader = styled.th`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);  // Table border
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);  // Cell border
  color: white;
  
`;
const Info = styled.div`
  padding-top:10px !important;
   padding-bottom:10px !important;
    padding-right:0px !important;
   padding-left:px !important;
   text-align: justify;
  
`;

const Infoo = styled.div`
  padding-top:0px !important;
   padding-bottom:10px !important;
    padding-right:5px !important;
   padding-left:5px !important;
   text-align: justify;
  
`;
// Table Components
const Project2Table = () => (
  <TableStyles>
    <thead>
      <tr>
        <TableHeader>Amount</TableHeader>
        <TableHeader>12 Months @ 8.5%</TableHeader>
        <TableHeader>24 Months @ 9%</TableHeader>
        <TableHeader>36 Months @ 10%</TableHeader>
        <TableHeader>60 Months @ 10.5%</TableHeader>
        <TableHeader>99 Months Double</TableHeader>
      </tr>
    </thead>
    <tbody>
      <tr>
        <TableCell>₹10,000</TableCell>
        <TableCell>₹10,850</TableCell>
        <TableCell>₹11,800</TableCell>
        <TableCell>₹13,000</TableCell>
        <TableCell>₹14,200</TableCell>
        <TableCell>₹20,000</TableCell>
      </tr>
      <tr>
        <TableCell>₹25,000</TableCell>
        <TableCell>₹27,125</TableCell>
        <TableCell>₹27,125</TableCell>
        <TableCell>₹32,500</TableCell>
        <TableCell>₹35,500</TableCell>
        <TableCell>₹50,000</TableCell>
      </tr>
      <tr>
        <TableCell>₹50,000</TableCell>
        <TableCell>₹54,250</TableCell>
        <TableCell>₹59,000</TableCell>
        <TableCell>₹65,000</TableCell>
        <TableCell>₹71,000</TableCell>
        <TableCell>₹100,000</TableCell>
      </tr>
    </tbody>
  </TableStyles>
);

// Project 3 Table
const Project3Table = () => (
  <TableStyles>
    <thead>
      <tr>
        <TableHeader>Amount</TableHeader>
        <TableHeader>12 Months @ 10%</TableHeader>
        <TableHeader>24 Months @ 10%</TableHeader>
        <TableHeader>36 Months @ 10%</TableHeader>
        <TableHeader>48 Months @ 10%</TableHeader>
        <TableHeader>60 Months @ 10%</TableHeader>
      </tr>
    </thead>
    <tbody>
      <tr>
        <TableCell>₹500</TableCell>
        <TableCell>₹6,333</TableCell>
        <TableCell>₹13,320</TableCell>
        <TableCell>₹21,034</TableCell>
        <TableCell>₹29,549</TableCell>
        <TableCell>₹38,949</TableCell>
      </tr>
      <tr>
        <TableCell>₹1,000</TableCell>
        <TableCell>₹12,666</TableCell>
        <TableCell>₹26,640</TableCell>
        <TableCell>₹42,068</TableCell>
        <TableCell>₹59,098</TableCell>
        <TableCell>₹77,898</TableCell>
      </tr>
      <tr>
        <TableCell>₹2,000</TableCell>
        <TableCell>₹25,332</TableCell>
        <TableCell>₹53,280</TableCell>
        <TableCell>₹84,136</TableCell>
        <TableCell>₹118,196</TableCell>
        <TableCell>₹155,796</TableCell>
      </tr>
    </tbody>
  </TableStyles>
);

// Project 4 Table
const Project4Table = () => (
  <TableStyles>
    <thead>
      <tr>
        <TableHeader>Amount</TableHeader>
        <TableHeader>12 Months @ 8%</TableHeader>
        <TableHeader>24 Months @ 8.5%</TableHeader>
        <TableHeader>36 Months @ 9%</TableHeader>
        <TableHeader>60 Months @ 9.5%</TableHeader>
        <TableHeader>72 Months @ 10%</TableHeader>
      </tr>
    </thead>
    <tbody>
      <tr>
        <TableCell>₹25,000</TableCell>
        <TableCell>₹167</TableCell>
        <TableCell>₹177</TableCell>
        <TableCell>₹188</TableCell>
        <TableCell>₹198</TableCell>
        <TableCell>₹219</TableCell>
      </tr>
      <tr>
        <TableCell>₹50,000</TableCell>
        <TableCell>₹333</TableCell>
        <TableCell>₹354</TableCell>
        <TableCell>₹375</TableCell>
        <TableCell>₹396</TableCell>
        <TableCell>₹438</TableCell>
      </tr>
      <tr>
        <TableCell>₹100,000</TableCell>
        <TableCell>₹667</TableCell>
        <TableCell>₹708</TableCell>
        <TableCell>₹750</TableCell>
        <TableCell>₹792</TableCell>
        <TableCell>₹875</TableCell>
      </tr>
    </tbody>
  </TableStyles>
);

export { Project2Table, Project3Table, Project4Table };

const ProjectsPage = ({ openModal, setOpenModal }) => {
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); 

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress color="secondary" />
        <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>Please wait...</Typography>
      </LoadingContainer>
    );
  }

  if (isMobile) {
    return <Mobile openModal={openModal} setOpenModal={setOpenModal} />;
  }

  return (
    
    
    <Container id="projects">
      <Wrapper>
  <CardContainer>
    <motion.div
      key="unique-id-1" // Make sure to provide a unique key
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <Typography variant="h4" component="div" style={{ fontWeight: 'bold', color: 'white', textAlign: 'center', margin: '10px 0' }}>
        SAVINGS ACCOUNT
      </Typography>

      <ProjectRow style={{ flexDirection: 'row' }}>
        <Details align="left">
          <Infoo>
          A Savings Account in a Society allows members to deposit money securely while earning interest. It provides a safe way to store funds and encourages saving within the community. Members can access their savings as needed, and interest rates are often competitive. Unlike traditional financial institutions, societies are owned by their members, which means profits are either reinvested or shared among members. These accounts foster a sense of community and offer personalized service, making them an attractive option for those looking to save responsibly while supporting local initiatives.
          </Infoo>
        </Details>

        <Card onClick={() => setOpenModal({ state: true, project: { /* your project data here */ } })}>
          <Image src="https://www.financialexpress.com/wp-content/uploads/2024/04/Savings-accounts.jpg" /> {/* Replace with your image path */}
          <Button href="link/to/your/webapp"> {/* Replace with your web app link */}
            Apply Now
          </Button>
        </Card>
      </ProjectRow>
    </motion.div>

    {/* Add more manual content blocks as needed */}
  </CardContainer>
</Wrapper>

      <Wrapper>
        <CardContainer>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ x: project.position === 'right' ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <Typography variant="h4" component="div" style={{ fontWeight: 'bold', color: 'white', textAlign: 'center', margin: '10px 0' }}>
                {project.title}
              </Typography>

              <ProjectRow style={{ flexDirection: project.position === 'right' ? 'row-reverse' : 'row' }}>
                <Details align={project.position === 'right' ? 'right' : 'left'}>
                  {/* Insert table here based on project index */}
                  {index === 0 && <Project2Table />}
                  {index === 1 && <Project3Table />}
                  {index === 2 && <Project4Table />}
                </Details>

                <Card onClick={() => setOpenModal({ state: true, project })}>
                  <Image src={project.image} />
                  <Button href={project.webapp}>
                    Apply Now
                  </Button>
                </Card>
              </ProjectRow>

              <AdditionalBox align={project.position}>
                <Typography variant="body2" style={{ color: '#E5E5E5' }}>
                <Info>
                {project.info}
                </Info>
                </Typography>
              </AdditionalBox>
            </motion.div>
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default ProjectsPage;
