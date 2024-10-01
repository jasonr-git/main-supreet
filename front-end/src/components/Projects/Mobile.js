import React, { useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { projects } from './data'; // Importing the project data from data.js

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

const TableStyles = styled.table`
  width: 100%; // Use full width of the card
  max-height: 50vh; // Responsive height
  border-collapse: collapse; 
  border-radius: 0px;  
  overflow: hidden;  
  font-size: 2vw; // Responsive font size for table
`;

const TableHeader = styled.th`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 2vw; // Responsive padding
  border: 1px solid rgba(255, 255, 255, 0.5);  // Table border
`;

const TableCell = styled.td`
  padding: 2vw; // Responsive padding
  border: 1px solid rgba(255, 255, 255, 0.5);  // Cell border
  color: white;
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

  return (
    <Container id="projects">
      <CardContainer>
        <motion.div
          key="unique-id-1"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <ProjectTitle>SAVINGS ACCOUNT</ProjectTitle>
          <ProjectRow>
            <Image src="https://www.financialexpress.com/wp-content/uploads/2024/04/Savings-accounts.jpg" />
            <Button href="link/to/your/webapp">Apply Now</Button>
          </ProjectRow>
        </motion.div>

        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectRow>
              <Image src={project.image} />
              {index === 0 && <Project2Table />}
              {index === 1 && <Project3Table />}
              {index === 2 && <Project4Table />}
              <Button href={project.webapp}>Apply Now</Button>
            </ProjectRow>
          </motion.div>
        ))}
      </CardContainer>
    </Container>
  );
};

export default ProjectsPage;
