import styled from 'styled-components';
import Photo from '../../components/Gallery';
import Footer from "../../components/Footer";
import Expand from "../../components/imgdetails";
import React, { useState, useEffect } from 'react';
import Form from "../../pages/payment/FormManager";
import bgImage from '../../images/bg2.avif'; // Update with the correct path to your image

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px; /* Optional padding */
  position: relative;
  z-index: 1; /* Ensures content is above the blur overlay */
`;

const FooterWrapper = styled.div`

  color: white;
  width: 100%;

  position: relative;
  z-index: 12;
`;

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  z-index: 0;
`;

const PaymentForm = () => {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <ContentWrapper>
        <BlurOverlay />
        <Form />
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
      {openModal.state && (
        <Expand openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </PageContainer>
  );
};

export default PaymentForm;
