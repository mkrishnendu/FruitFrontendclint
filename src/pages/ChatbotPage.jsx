import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import ActionProvider from '../utils/ActionProvider';
import MessageParser from '../utils/MessageParser';
import config from '../utils/config';

const ChatbotPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: 4,
        marginTop: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          borderRadius: 2,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Fruit Chatbot
        </Typography>
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </Box>
    </Container>
  );
};

export default ChatbotPage;
