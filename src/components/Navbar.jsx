import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton, Menu, MenuItem, useMediaQuery, useTheme, Slide } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');

    navigate('/login');
    handleMenuClose();
  };

  return (
    <Slide in direction="down" timeout={500}>
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(135deg, #006400 0%, #32CD32 100%)', // Green gradient
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          transition: 'background 0.3s ease',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#ffffff' }}>
            Fruit.ai
          </Typography>
          {isSmallScreen ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ marginRight: '16px' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{ style: { width: '220px', backgroundColor: '#004d00' } }} // Dark green background for menu
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/" sx={{ color: '#ffffff' }}>Home</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/chatbot" sx={{ color: '#ffffff' }}>Chatbot</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/translator" sx={{ color: '#ffffff' }}>Translator</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/faq" sx={{ color: '#ffffff' }}>FAQ</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/about" sx={{ color: '#ffffff' }}>About</MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: '#ff5722' }}>Logout</MenuItem> {/* Optional color for Logout */}
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'uppercase', color: '#ffffff' }}>Home</Button>
              <Button color="inherit" component={Link} to="/chatbot" sx={{ textTransform: 'uppercase', color: '#ffffff' }}>Chatbot</Button>
              <Button color="inherit" component={Link} to="/translator" sx={{ textTransform: 'uppercase', color: '#ffffff' }}>Translator</Button>
              <Button color="inherit" component={Link} to="/faq" sx={{ textTransform: 'uppercase', color: '#ffffff' }}>FAQ</Button>
              <Button color="inherit" component={Link} to="/about" sx={{ textTransform: 'uppercase', color: '#ffffff' }}>About</Button>
              <Button color="inherit" onClick={handleLogout} sx={{ textTransform: 'uppercase', color: '#ff5722' }}>Logout</Button> {/* Optional color for Logout */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default Navbar;
