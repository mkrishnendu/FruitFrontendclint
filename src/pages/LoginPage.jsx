import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box, Tabs, Tab, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import { Facebook, Instagram, Pinterest, LinkedIn, Visibility, VisibilityOff, MailOutline, LockOutlined } from '@mui/icons-material';

const dummyUser = {
  user: 'user@gmail.com',
  password: 'user321',
};

function LoginPage({ setAuth }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tabValue, setTabValue] = useState('login');
  const navigate = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (authData && authData.isAuthenticate) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId === dummyUser.user && password === dummyUser.password) {
      const authData = { isAuthenticate: true, user: userId };
      localStorage.setItem('auth', JSON.stringify(authData));
      setAuth(authData);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 4,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <Paper
          sx={{
            padding: 4,
            width: '100%',
            textAlign: 'center',
            boxShadow: 5,
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            centered
            sx={{ marginBottom: 3 }}
          >
            <Tab label="Login" value="login" />
            <Tab label="Register" value="register" />
          </Tabs>

          <Typography
            variant="body1"
            sx={{
              color: '#555',
              marginBottom: '20px',
            }}
          >
            {tabValue === 'login' ? 'Please enter your credentials to log in.' : 'Register a new account.'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              sx={{ marginBottom: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 3,
              }}
            >
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember password"
              />
              <Typography
                variant="body2"
                sx={{ color: '#673AB7', cursor: 'pointer' }}
              >
                Forget password
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                padding: '12px',
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #673AB7, #512DA8)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5E35B1, #4527A0)',
                },
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              Log In
            </Button>
          </form>

          <Typography variant="body2" sx={{ marginTop: 3, color: 'gray' }}>
            or connect with
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
            <IconButton color="primary">
              <Facebook />
            </IconButton>
            <IconButton color="secondary">
              <Instagram />
            </IconButton>
            <IconButton color="error">
              <Pinterest />
            </IconButton>
            <IconButton color="info">
              <LinkedIn />
            </IconButton>
          </Box>

          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            
            
          </Box>

          <Typography
            variant="body2"
            sx={{ marginTop: 3, color: 'gray' }}
          >
            Test user credentials:
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#673AB7', fontWeight: 'bold' }}
          >
            userId: user@gmail.com <br />
            password: user321
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
