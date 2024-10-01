import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { CircularProgress, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard';
import Management from './member';

// Import your CSS file for Sidebar
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
    justify-content: center; /* Center the content */
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 960px;
    padding: 80px 0;
    gap: 12px;
    @media (max-width: 768px) {
        width: 90%;
    }
`;

const Title = styled.div`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-top: 10vh;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`;

const Desc = styled.div`
    margin-top: 2%;
    font-size: 22px;
    text-align: center;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
    text-align: justify; 
`;

const TimelineSection = styled.div`
    width: 100%;
    max-width: 960px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-left: -3%;
     @media (max-width: 768px) {
        margin-top: 12px;
        margin-left: -10%;
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
    const [experiences, setExperiences] = useState([]);

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

        const fetchExperiences = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'progress'));
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setExperiences(data);
            } catch (error) {
                console.error('Error fetching experiences:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOriginDescription();
        fetchExperiences();
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

            {/* ABOUT OUR ORIGIN */}
            <Wrapperdesc>
                <Title>{isEnglish ? 'Origin' : 'ಆರಂಭ'}</Title>
                <Desc>{originDesc}</Desc>
            </Wrapperdesc>

            {/* STATS SECTION */}
            {/* <Wrapper>
                <Title>Statistics</Title>
                <Desc>Year to year progress</Desc>
                <TimelineSection>
                    <Timeline>
                        {experiences.map((experience, index) => (
                            <TimelineItem key={experience.id}>
                                <TimelineSeparator>
                                    <TimelineDot variant="outlined" color="secondary" />
                                    {index !== experiences.length - 1 && <TimelineConnector sx={{ background: '#854CE6' }} />}
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: 1, px: 2, textAlign: 'center' }}>
                                    <ExperienceCard experience={experience} />
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </TimelineSection>
            </Wrapper> */}
{/* 
            <Wrapper>
                <Management />
            </Wrapper> */}
            <Sidebar isEnglish={isEnglish} toggleLanguage={toggleLanguage} />
        </Container>
    );
};

export default Index;
