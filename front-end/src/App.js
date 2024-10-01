import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme } from './utils/Themes.js'; 
import Navbar from "./components/Navbar/index.js";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeroSection from "./components/HeroSection/index.js";
import Services from "./components/Desc/index.js";
import Footer from "./components/Footer/index.js";
import ProjectDetails from "./components/ProjectDetails/index.jsx";
import Gallery from "./pages/Gallery/Gallery.jsx";
import Stats from "./pages/stats/stats.js";
import Servicepage from "./pages/services/services.js";
import Contactpage from "./pages/contact/contact.js";
import Chatbot from "./components/chatbot/Chatbot.js";
import EMICalculator from "./components/emi/EMICalculator.js";
import Sidebar from "./components/sidebar/Sidebar.js";
import styled from "styled-components"; 
import News from "./pages/News/News.js";
import Header from "./components/Header/Header.js";
import OpenAccount from "./pages/OpenAccount/index.js";
import GoldPriceChart from "./components/Gold/GoldPriceChart.js";
import Loan from "./pages/services/Loan.js";
import OtherService from "./pages/services/Others.js";
import PaymentPage from "./pages/payment/index.js";
import PaymentLink from "./pages/payment/Payment.js"
import Application from "./pages/Application/index.js";
import Progress from "./pages/Progress/Progress.js";
import Chatmob from "./components/chatbot/chatmob/Chatbot.js";


const Body = styled.div``;

const Wrapper = styled.div`
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(15px);
  margin-top: -3rem;
  z-index: 50; /* Ensure this value is lower than Chatbotwrap */
  width: 100%;
`;

const FooterWrapper = styled.div`
  background-color: black;
  z-index: 1; /* Ensure this value is lower than Chatbotwrap */
  color: white; /* Ensure the text contrasts well */
  margin-bottom: -100px;
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
  transform-origin: top; /* Ensures the fold happens from the top */
`;

const HeaderContainer = styled.div`
  transition: transform 0.3s ease-in-out, padding 0.3s ease-in-out;
  transform-origin: top; /* Ensures the fold happens from the top */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Chatbotwrap = styled.div`
  z-index: 998; /* Ensure this value is higher than other components */
  position: fixed; /* Ensures it stays in place when scrolling */
  bottom: 20px; /* Adjust as needed */
  right: 20px; /* Adjust as needed */
  @media (max-width: 768px) {
    // Adjust as needed for mobile view
  }
`;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [folded, setFolded] = useState(false);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  const handleScroll = () => {
    if (window.scrollY > 50) { // Adjust this value as needed
      setFolded(true);
    } else {
      setFolded(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <ScrollToTop />
        <NavbarContainer>
          <HeaderNavContainer className={folded ? 'folded' : ''}>
            <HeaderContainer className={folded ? 'folded' : ''}>
              <Header />
            </HeaderContainer>
            <Navbar />
          </HeaderNavContainer>
        </NavbarContainer>
        <Chatbotwrap>
                <Chatbot />
              </Chatbotwrap>
        <Routes>
          <Route path="/" element={
            <Body>
              <HeroSection />
              <Wrapper>
                <Services />
                <br />
                <br />
                <br />
              </Wrapper>
              {/* <Sidebar /> */}
              {/* <GoldPriceChart /> */}
              {/* <EMICalculator /> */}
              <FooterWrapper>
                <Footer />
              </FooterWrapper>
            </Body>
          } />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/aboutus" element={<Stats />} />
          <Route path="/deposit" element={<Servicepage />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/others" element={<OtherService />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/news" element={<News />} />
          <Route path="/openaccount" element={<OpenAccount />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/paymentlink" element={<PaymentLink />} />
          <Route path= "/application" element ={(<Application />)} />
          <Route path= "/progress" element ={(<Progress />)} />
          <Route path= "/chatmob" element ={(<Chatmob />)} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
