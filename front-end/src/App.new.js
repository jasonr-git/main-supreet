import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Theme and Constants
import { darkTheme } from './utils/Themes.js';
import { ROUTES } from './constants/routes.js';

// Layout Components
import Header from './components/layout/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/chatbot/Chatbot.js';

// Common Components
import AboutSection from './components/common/AboutSection';
import HeroSection from './components/HeroSection';

// Pages
import Gallery from './pages/Gallery/Gallery.jsx';
import Stats from './pages/stats/stats.js';
import Servicepage from './pages/services/services.js';
import Contactpage from './pages/contact/contact.js';
import News from './pages/News/News.js';
import OpenAccount from './pages/OpenAccount/index.js';
import Loan from './pages/services/Loan.js';
import OtherService from './pages/services/Others.js';
import PaymentPage from './pages/payment/index.js';
import PaymentLink from './pages/payment/Payment.js';
import Application from './pages/Application/index.js';
import Progress from './pages/Progress/Progress.js';
import Chatmob from './components/chatbot/chatmob/Chatbot.js';

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: ${({ theme }) => theme.navBg};
  transition: transform 0.3s ease-in-out;
`;

const HeaderNavContainer = styled.div`
  position: relative;
  transition: transform 0.3s ease-in-out;
  transform-origin: top;
`;

const ChatbotWrapper = styled.div`
  z-index: 998;
  position: fixed;
  bottom: 20px;
  right: 20px;
  
  @media (max-width: 768px) {
    bottom: 80px;
  }
`;

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  margin-top: -3rem;
  z-index: 50;
  width: 100%;
  padding-bottom: 3rem;
`;

const FooterWrapper = styled.div`
  background-color: black;
  color: white;
  margin-top: auto;
`;

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Home page component
const HomePage = () => (
  <HomePageWrapper>
    <HeroSection />
    <ContentWrapper>
      <AboutSection />
    </ContentWrapper>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </HomePageWrapper>
);

function App() {
  const [folded, setFolded] = useState(false);

  const handleScroll = () => {
    setFolded(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <AppContainer>
          <ScrollToTop />
          
          <NavbarContainer>
            <HeaderNavContainer className={folded ? 'folded' : ''}>
              <Header folded={folded} />
              <Navbar />
            </HeaderNavContainer>
          </NavbarContainer>

          <ChatbotWrapper>
            <Chatbot />
          </ChatbotWrapper>

          <MainContent>
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.GALLERY} element={<Gallery />} />
              <Route path={ROUTES.ABOUT} element={<Stats />} />
              <Route path={ROUTES.DEPOSIT} element={<Servicepage />} />
              <Route path={ROUTES.LOAN} element={<Loan />} />
              <Route path={ROUTES.OTHERS} element={<OtherService />} />
              <Route path={ROUTES.CONTACT} element={<Contactpage />} />
              <Route path={ROUTES.NEWS} element={<News />} />
              <Route path={ROUTES.OPEN_ACCOUNT} element={<OpenAccount />} />
              <Route path={ROUTES.PAYMENT} element={<PaymentPage />} />
              <Route path={ROUTES.PAYMENT_LINK} element={<PaymentLink />} />
              <Route path={ROUTES.APPLICATION} element={<Application />} />
              <Route path={ROUTES.PROGRESS} element={<Progress />} />
              <Route path={ROUTES.CHAT_MOBILE} element={<Chatmob />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;