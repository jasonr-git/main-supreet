import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Projects from '../../components/Projects';
import Footer from "../../components/Footer";
import backgroundImage from '../../images/bg2.gif'; // Import your background image here
import { Payment } from '@mui/icons-material';
import DepositCalculator from "./DepositCalculator";
const BackgroundImage = styled.div`
  position: relative; /* Required for z-index to work */
  min-height: 100vh; /* Ensures it takes at least the full viewport height */
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: cover;
`;

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(60px); /* Add blur filter to the background image */
  z-index: 1; /* Adjust the z-index as needed */
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2; /* Place content above the blur overlay */
`;

const FooterWrapper = styled.div`
  background-color: black;
  margin-top: 6px;
  color: black; /* Optional: if you want to ensure the text color contrasts well */
  position: relative;
  bottom:0;
  z-index: 9999; /* Place footer above content and blur overlay */
`;

const Gallery = () => {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  useEffect(() => {
    // Scroll to the top of the page when the Gallery component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this effect runs only on mount

  console.log(openModal);

  return (
    <BackgroundImage>
      {/* <PaymentComp /> */}
      <BlurOverlay />
      <ContentWrapper>
        <Projects/>
        <DepositCalculator />
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </BackgroundImage>
  );
};

export default Gallery;
