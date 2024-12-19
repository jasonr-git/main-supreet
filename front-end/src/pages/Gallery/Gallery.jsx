import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCircle } from 'react-icons/fa';
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

const LoadMoreButton = styled.button`
  background-color: white;
  color: #ff7e5f;
  border: none;
  padding: 10px 20px;
  margin: 20px 0;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff7e5f;
    color: white;
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

const FooterWrapper = styled.div`
  background-color: black;
  color: white;
  text-align: center;
  padding: 10px;
`;

const Footer = () => <div>© 2024 Your Company. All rights reserved.</div>;

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState(10); // Number of initially visible images
  const [images, setImages] = useState([]);

  useEffect(() => {
    const allImages = photoGroups.flatMap(group => group.images);
    setImages(allImages);
  }, []);

  const loadMoreImages = () => {
    setVisibleImages(prevCount => prevCount + 10); // Load 10 more images on each click
  };

  return (
    <GalleryContainer>
      <ContentWrapper>
        {photoGroups.map((group, index) => (
          <GalleryGroup key={index}>
            <GroupTitle>{group.title}</GroupTitle>
            <GroupDescription>{group.description}</GroupDescription>
            <ImageContainer>
              {group.images.slice(0, visibleImages).map(photo => (
                <GalleryItem key={photo.id}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
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
        {visibleImages < images.length && (
          <LoadMoreButton onClick={loadMoreImages}>
            Load More
          </LoadMoreButton>
        )}
      </ContentWrapper>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </GalleryContainer>
  );
};

export default Gallery;
