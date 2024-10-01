import React, { useRef } from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import { useNavigate } from 'react-router-dom';
import {
  HeroContainer,
  FrostedGlassOverlay,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
  ResumeButton
} from './HeroStyle';
import HeroImg from '../../images/HeroImage.jpg';
import Typewriter from 'typewriter-effect';

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

    const transformStyle = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    img.style.transform = transformStyle;
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
  };

  const handleMouseDown = () => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
  };

  const handleMouseUp = () => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
  };

  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <Title>Welcome to Supreet Souharda Co-op Society!</Title>
            <TextLoop>
              We
              <Span>
                <Typewriter
                  options={{
                    strings: ["Empower Futures.", " Enable Dreams.", "Foster Growth."],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle>Welcome to Supreet Souharda Co-op Society! We offer savings accounts, flexible loans, fixed deposits, comprehensive insurance, and digital banking services. Join us to benefit from our financial advisory, microfinance solutions, and community programs.</SubTitle>
            <ResumeButton onClick={() => {
              console.log('Navigating to /openaccount');
              navigate('/openaccount');
            }}>OPEN A SAVINGS ACCOUNT</ResumeButton>
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <Img
              ref={imgRef}
              src={HeroImg}
              alt="hero-image"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            />
          </HeroRightContainer>
        </HeroInnerContainer>
        <FrostedGlassOverlay />
      </HeroContainer>
    </div>
  );
}

export default HeroSection;
