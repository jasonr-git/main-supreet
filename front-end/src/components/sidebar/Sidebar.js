import React, { useState, useEffect } from 'react';
import './Sidebar.css'; // Import your CSS file

const Sidebar = () => {
  const [isEnglish, setIsEnglish] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // State for sidebar expansion

  useEffect(() => {
    // Dynamically append Font Awesome link to the head
    const fontAwesomeLink = document.createElement("link");
    fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    fontAwesomeLink.rel = "stylesheet";
    document.head.appendChild(fontAwesomeLink);

    // Cleanup function to remove the link when the component unmounts
    return () => {
      document.head.removeChild(fontAwesomeLink);
    };
  }, []);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        {isExpanded ? (
          <i className="fas fa-chevron-left"></i>
        ) : (
          <div className='globe'>
          <i className="fas fa-globe" id='globe'></i>
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="language-toggle">
          <div
            className={`language-option ${isEnglish ? 'selected' : ''}`}
            onClick={() => setIsEnglish(true)}
          >
            ENG
          </div>
          <div
            className={`language-option ${!isEnglish ? 'selected' : ''}`}
            onClick={() => setIsEnglish(false)}
          >
            ಕನ್ನಡ
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
