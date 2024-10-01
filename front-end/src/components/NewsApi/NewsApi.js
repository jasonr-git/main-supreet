import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const LoadingContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    flexDirection: 'column',
});

const FinanceNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = 'e65470793c1245ff972ffbe494ead385';
    const url = `https://newsapi.org/v2/everything?q=finance+india&pageSize=20&apiKey=${apiKey}`;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(url);
                setArticles(response.data.articles);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <LoadingContainer>
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2 }}>Please wait...</Typography>
            </LoadingContainer>
        );
    }

    if (error) {
        return (
            <Box sx={{ minHeight: '100vh', padding: '20px' }}>
                <Typography variant="h6" color="error">Error fetching news: {error.message}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', padding: '20px' }}>
            <Container>
                <Grid container spacing={4}>
                    {articles.slice(0, 1).map((article, index) => (
                        <Grid item xs={12} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={article.urlToImage}
                                    alt={article.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" color="textSecondary">
                                        {article.source.name} - {new Date(article.publishedAt).toLocaleTimeString()}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {article.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={4}>
                    <Typography variant="h5" mb={2}>Latest News</Typography>
                    <Grid container spacing={4}>
                        {articles.slice(1, 13).map((article, index) => ( // Changed slice to display 12 articles
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={article.urlToImage}
                                        alt={article.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" color="textSecondary" sx={{ height: '2rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {article.source.name} - {new Date(article.publishedAt).toLocaleTimeString()}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ height: '12rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {article.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ height: '12rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {article.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default FinanceNews;
