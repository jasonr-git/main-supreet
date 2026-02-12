import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { CircularProgress, Typography } from '@mui/material';

import Management from './member';
import Timeline from './Timeline';

import './Sidebar.css';

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0px 80px 0px;
    position: relative;
    z-index: 1;
    overflow: hidden; /* Ensure no scroll bars */

    /* Bokeh background effect */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 0, 0, 0.3), transparent 40%) 0% 0% / 10px 10px,
                    radial-gradient(circle, rgba(0, 0, 255, 0.3), transparent 40%) 50px 50px / 20px 20px,
                    radial-gradient(circle, rgba(255, 0, 0, 0.3), transparent 40%) 100px 100px / 30px 30px;
        animation: moveBokeh 20s linear infinite;
        z-index: -1;
        filter: blur(15px);
    }

    @keyframes moveBokeh {
        0% { background-position: 0% 0%, 50px 50px, 100px 100px; }
        50% { background-position: 100% 100%, 0px 50px, 50px 0px; }
        100% { background-position: 0% 0%, 50px 50px, 100px 100px; }
    }

    @media (max-width: 960px) {
        padding: 0px;
        margin: 0%;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center; /* Center the content */
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 960px;
    padding: 80px 0;
    gap: 12px;
    @media (max-width: 960px) {
        padding: 20px 0;
    }
`;

const Wrapperdesc = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 960px;
    padding: 80px 0 40px;
    gap: 12px;
    @media (max-width: 768px) {
        width: 90%;
        padding: 40px 0 20px;
    }
`;

const Title = styled.div`
    font-family: 'Poppins', sans-serif;
    font-size: 3rem;
    text-align: center;
    font-weight: 700;
    margin-top: 10vh;
    color: ${({ theme }) => theme.text_primary};
    letter-spacing: -0.02em;
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 2rem;
    }
`;

const Desc = styled.div`
    margin-top: 2%;
    font-family: 'Inter', sans-serif;
    font-size: 1.125rem;
    line-height: 1.75;
    text-align: center;
    color: rgba(255, 255, 255, 0.85);
    max-width: 800px;
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 1rem;
        line-height: 1.6;
    }
`;



const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
`;

const Sidebar = ({ isEnglish, toggleLanguage }) => {
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
                        onClick={() => toggleLanguage(true)}
                    >
                        ENG
                    </div>
                    <div
                        className={`language-option ${!isEnglish ? 'selected' : ''}`}
                        onClick={() => toggleLanguage(false)}
                    >
                        ಕನ್ನಡ
                    </div>
                </div>
            )}
        </div>
    );
};

const Index = () => {
    const [isEnglish, setIsEnglish] = useState(true);
    const [originDesc, setOriginDesc] = useState('');
    const [loading, setLoading] = useState(true);
    const [, setExperiences] = useState([]);

    const toggleLanguage = (isEnglish) => {
        setIsEnglish(isEnglish);
    };

    useEffect(() => {
        const fetchOriginDescription = async () => {
            setLoading(true);
            try {
                const originDoc = await getDocs(collection(db, 'origin'));
                if (!originDoc.empty) {
                    const descId = isEnglish ? 'desc' : 'desckan';
                    const descDoc = originDoc.docs.find(doc => doc.id === descId);
                    if (descDoc) {
                        setOriginDesc(descDoc.data().description);
                    }
                }
            } catch (error) {
                console.error('Error fetching origin description:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOriginDescription();
    }, [isEnglish]); // Add isEnglish to the dependency array

    if (loading) {
        return (
            <LoadingContainer>
                <CircularProgress color="secondary" />
                <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>Please wait...</Typography>
            </LoadingContainer>
        );
    }

    return (
        <Container id="experience">
            <Wrapperdesc>
                <Title>{isEnglish ? 'Origin' : 'ಆರಂಭ'}</Title>
                <Desc>{originDesc}</Desc>
            </Wrapperdesc>

            <Timeline />

            <Wrapper>
                <Management />
            </Wrapper>
            
            <Sidebar isEnglish={isEnglish} toggleLanguage={toggleLanguage} />
        </Container>
    );
};

export default Index;
