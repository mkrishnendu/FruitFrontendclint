import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Box,
} from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';

const TranslatorPage = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');

  const languages = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    zh: 'Chinese',
    hi: 'Hindi',
    bn: 'Bengali',
  };

  const translateText = async () => {
    if (inputText.trim() === '') {
      console.error('Input text is empty');
      return;
    }

    try {
      const apiKey = `${import.meta.env.VITE_TRANSLATOR_API}`;
      const endpoint = `${import.meta.env.VITE_TRANSLATOR_ENDPOINT}`;
      
      const response = await axios.post(
        `${endpoint}&from=${sourceLang}&to=${targetLang}`,
        [{ text: inputText }],
        {
          headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
            'Ocp-Apim-Subscription-Region': 'southeastasia',
            'Content-Type': 'application/json',
          },
        }
      );

      setTranslatedText(response.data[0].translations[0].text);
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedText('Error translating text. Please try again.');
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setTranslatedText('');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        marginTop: 4,
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: '5px 3px rgba(33, 34, 43, 0.5)',
          width: '100%',
          maxWidth: 600,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Translator
        </Typography>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Source Language</InputLabel>
          <Select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            label="Source Language"
          >
            {Object.entries(languages).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleSwapLanguages}
          sx={{
            background:"none",
            color:"black"
          }}
        >
          <ImportExportIcon/>
        </Button>
        <FormControl fullWidth variant="outlined" sx={{ marginTop: 2 }}>
          <InputLabel>Target Language</InputLabel>
          <Select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            label="Target Language"
          >
            {Object.entries(languages).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Enter text to translate"
          variant="outlined"
          multiline
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Button
          onClick={translateText}
          variant="contained"
          fullWidth
          sx={{
            background: 'linear-gradient(45deg, #000000 30%, #4f4f4f 90%)',
            color: '#fff',
            marginTop: 2,
            '&:hover': {
              backgroundColor: '#303f9f',
            },
            borderRadius: '20px',
            padding: '8px 16px',
          }}
        >
          Translate
        </Button>
        {translatedText && (
          <TextField
            fullWidth
            label="Translated text"
            variant="outlined"
            multiline
            rows={4}
            value={translatedText}
            readOnly
            sx={{ marginTop: 2 }}
          />
        )}
      </Paper>
    </Container>
  );
};

export default TranslatorPage;
