import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Theme and Constants
import { darkTheme } from './utils/Themes.js';
import { ROUTES } from './constants/routes.js';

// Layout Components
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Chatbot from './components/chatbot/Chatbot.js';

// Pages
import HomePage from './pages/Home';
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

// Hooks
import useScroll from './hooks/useScroll';

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  transition: transform 0.3s ease-in-out;
`;

const HeaderNavContainer = styled.div`
  position: relative;
  transition: transform 0.3s ease-in-out;
  transform-origin: top;
  
  &.folded {
    transform: scaleY(0.9);
  }
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

const MainContent = styled.main`
  flex: 1;
  margin-top: 120px; // Account for fixed navbar
  
  @media (max-width: 768px) {
    margin-top: 80px;
  }
`;

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const { scrolled } = useScroll(50);

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <AppContainer>
          <ScrollToTop />
          
          <NavbarContainer>
            <HeaderNavContainer className={scrolled ? 'folded' : ''}>
              <Header folded={scrolled} />
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