import React from 'react';
import styled from 'styled-components';
import HeroSection from '../../features/hero/HeroSection';
import ServicesSection from '../../features/banking/ServicesSection';
import Footer from '../../components/layout/Footer';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const ContentWrapper = styled.div`
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  margin-top: -3rem;
  position: relative;
  z-index: 50;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <MainContent>
        <HeroSection />
        <ContentWrapper>
          <ServicesSection />
        </ContentWrapper>
      </MainContent>
      <Footer />
    </HomeContainer>
  );
};

export default HomePage;