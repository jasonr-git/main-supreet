import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import HeroBgAnimation from '../../components/HeroBgAnimation';
import Button from '../../components/ui/Button';
import HeroImg from '../../images/HeroImage.jpg';

const HeroContainer = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  min-height: 100vh;
  
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  
  @media (max-width: 640px) {
    padding: 32px 16px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  
  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  display: flex;
  order: 2;
  justify-content: end;
  gap: 12px;
  
  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
  }
  
  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 50px;
  color: white;
  line-height: 68px;
  
  @media (max-width: 960px) {
    text-align: center;
  }
  
  @media (max-width: 640px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: white;
  line-height: 68px;
  
  @media (max-width: 960px) {
    text-align: center;
  }
  
  @media (max-width: 640px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.span`
  color: #007bff;
  cursor: pointer;
`;

const SubTitle = styled.p`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: rgba(255, 255, 255, 0.95);
  
  @media (max-width: 960px) {
    text-align: center;
  }
  
  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border-radius: 50%;
  border: 2px solid white;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    if (!img) return;

    const height = img.clientHeight;
    const width = img.clientWidth;
    const xVal = e.nativeEvent.offsetX;
    const yVal = e.nativeEvent.offsetY;
    const yRotation = 20 * ((xVal - width / 2) / width);
    const xRotation = -20 * ((yVal - height / 2) / height);

    img.style.transform = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    if (img) {
      img.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
    }
  };

  return (
    <HeroContainer id="hero">
      <HeroBg>
        <HeroBgAnimation />
      </HeroBg>
      
      <HeroInnerContainer>
        <HeroLeftContainer>
          <Title>Welcome to Supreet Souharda Co-op Society!</Title>
          
          <TextLoop>
            We
            <Span>
              <Typewriter
                options={{
                  strings: ["Empower Futures.", "Enable Dreams.", "Foster Growth."],
                  autoStart: true,
                  loop: true,
                }}
              />
            </Span>
          </TextLoop>
          
          <SubTitle>
            Welcome to Supreet Souharda Co-op Society! We offer savings accounts, 
            flexible loans, fixed deposits, comprehensive insurance, and digital banking services. 
            Join us to benefit from our financial advisory, microfinance solutions, and community programs.
          </SubTitle>
          
          <Button 
            variant="primary" 
            size="large"
            onClick={() => navigate('/openaccount')}
          >
            OPEN A SAVINGS ACCOUNT
          </Button>
        </HeroLeftContainer>

        <HeroRightContainer>
          <Img
            ref={imgRef}
            src={HeroImg}
            alt="Supreet Souharda Banking"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </HeroRightContainer>
      </HeroInnerContainer>
    </HeroContainer>
  );
};

export default HeroSection;