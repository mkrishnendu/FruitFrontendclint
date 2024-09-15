import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const AboutPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: 4,
        textAlign: 'center',
        marginTop: 20,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          margin: 'auto',
          maxWidth: '800px',
          boxShadow: '5px 3px rgba(33, 34, 43, 0.5)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          About Fruit.ai
        </Typography>
        <Typography variant="body1" paragraph>
          Fruit.ai is a health manager application designed to provide users with
          essential information about fruits, a chatbot for fruit queries, a translator
          for translating fruit names into regional languages, and a FAQ section where
          users can find answers to commonly asked questions.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
