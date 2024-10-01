import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import photoGroups from './photoData'; // Adjust the path if necessary

const GalleryContainer = styled.div`
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  margin-top: 16vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    margin-top: 12vh;
    padding: 10px;
  }
`;

const GalleryGroup = styled.div`
  margin: 20px;
  text-align: center;
  width: 100%;
`;

const GroupTitle = styled.h2`
  margin-bottom: 10px;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const GroupDescription = styled.p`
  margin-bottom: 15px;
  color: white;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const GalleryItem = styled.div`
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 216px;
    height: 144px;
    object-fit: cover;
    border-radius: 8px;

    @media (max-width: 768px) {
      width: 140px;
      height: 90px;
    }

    @media (max-width: 480px) {
      width: 120px;
      height: 80px;
    }
  }
`;

const LineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin: 20px 0;
`;

const Line = styled.div`
  width: 2px;
  height: 80px;
  background: white;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const Dot = styled(FaCircle)`
  color: white;
  font-size: 10px;
  margin: 10px 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ImageWrapper = styled.div`
  margin-top: 10vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  img {
    width: 700px;
    height: 500px;
    object-fit: cover;
    border-radius: 8px;

    @media (max-width: 1024px) {
      width: 80%;
      height: auto;
    }

    @media (max-width: 768px) {
      width: 90%;
      height: auto;
    }

    @media (max-width: 480px) {
      width: 100%;
      height: auto;
    }
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Arrow = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;

  img {
    width: 70px;
    height: 50px;
    cursor: pointer;
    border-radius: 4px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      width: 60px;
      height: 45px;
    }

    @media (max-width: 480px) {
      width: 50px;
      height: 40px;
    }
  }
`;

const FooterWrapper = styled.div`
  background-color: black;
  color: white;
  text-align: center;
  padding: 10px;
`;

const Footer = () => <div>© 2024 Your Company. All rights reserved.</div>;

const Gallery = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePhotoClick = (photo) => {
    setCurrentImage(photo);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setCurrentImage(null);
  };

  const handleNext = () => {
    const currentIndex = images.findIndex(img => img.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = images.findIndex(img => img.id === currentImage.id);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[previousIndex]);
  };

  useEffect(() => {
    const allImages = photoGroups.flatMap(group => group.images);
    setImages(allImages);
  }, []);

  return (
    <GalleryContainer>
      <ContentWrapper>
        {photoGroups.map((group, index) => (
          <GalleryGroup key={index}>
            <GroupTitle>{group.title}</GroupTitle>
            <GroupDescription>{group.description}</GroupDescription>
            <ImageContainer>
              {group.images.map(photo => (
                <GalleryItem key={photo.id} onClick={() => handlePhotoClick(photo)}>
                  <img src={photo.src} alt={photo.alt} />
                </GalleryItem>
              ))}
            </ImageContainer>
            {index < photoGroups.length - 1 && (
              <LineWrapper>
                <Dot />
                <Line />
                <Dot />
              </LineWrapper>
            )}
          </GalleryGroup>
        ))}
      </ContentWrapper>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>

      {openModal && currentImage && (
        <ModalContainer>
          <Arrow onClick={handlePrevious}><FaArrowLeft /></Arrow>
          <CloseButton onClick={closeModal}>×</CloseButton>
          <ImageWrapper>
            <img src={currentImage.src} alt={currentImage.alt} />
          </ImageWrapper>
          <Arrow onClick={handleNext}><FaArrowRight /></Arrow>

          <ThumbnailContainer>
            {images.map((img) => (
              <img 
                key={img.id} 
                src={img.src} 
                alt={img.alt} 
                onClick={() => setCurrentImage(img)} 
              />
            ))}
          </ThumbnailContainer>
        </ModalContainer>
      )}
    </GalleryContainer>
  );
}

export default Gallery;
