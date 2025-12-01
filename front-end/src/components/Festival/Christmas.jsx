import React, { useState, useEffect } from 'react';
import ChristmasImageMobile from '../../images/festival/mchristmas.avif'; // Mobile version
import ChristmasImageDesktop from '../../images/festival/dchristmas.avif'; // Desktop version

const ChristmasIntro = () => {
  const [isVisible, setIsVisible] = useState(false); // Modal visibility
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Image load status

  useEffect(() => {
    // Check if we've already shown the intro in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenChristmasIntro');

    if (!hasSeenIntro) {
      setIsVisible(true);
      sessionStorage.setItem('hasSeenChristmasIntro', 'true'); // Mark as shown in sessionStorage
    }

    // Automatically hide the modal 3 seconds after the image loads
    if (isImageLoaded) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide the modal
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [isImageLoaded]);

  const handleImageLoad = () => {
    setIsImageLoaded(true); // Mark the image as loaded
  };

  if (!isVisible) {
    return null; // Don't render the modal if it's not visible
  }

  return (
    <div style={isImageLoaded ? styles.overlay : styles.hiddenOverlay}>
      <div style={styles.modal}>
        <picture>
          {/* Mobile image for smaller screens */}
          <source media="(max-width: 768px)" srcSet={ChristmasImageMobile} />
          {/* Desktop image for larger screens */}
          <source media="(min-width: 769px)" srcSet={ChristmasImageDesktop} />
          <img
            src={ChristmasImageDesktop} // Fallback image for other cases
            alt="Merry Christmas"
            style={styles.image}
            onLoad={handleImageLoad} // Trigger when the image is fully loaded
          />
        </picture>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dimmed background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    opacity: 1, // Initially visible
    animation: 'fadeIn 1s, fadeOut 1s 2s', // Fade in and out effects
  },
  hiddenOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    opacity: 0, // Initially hidden
  },
  modal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%', // Make the image cover the full screen height as well
    objectFit: 'cover', // Ensure the image covers the whole area without distortion
  },
};

// Adding the keyframes for fadeIn and fadeOut animations
const fadeInOutStyle = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

// Inject the fade-in/out styles into the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = fadeInOutStyle;
  document.head.appendChild(styleElement);
}

export default ChristmasIntro;
