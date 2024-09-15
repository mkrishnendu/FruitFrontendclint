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
          background: 'linear-gradient(45deg, #000000 30%, #4f4f4f 90%)',
          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Fruit.ai
          </Typography>
          {isSmallScreen ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{ style: { width: '200px' } }}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/chatbot">Chatbot</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/translator">Translator</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/faq">FAQ</MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/about">About</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/chatbot">Chatbot</Button>
              <Button color="inherit" component={Link} to="/translator">Translator</Button>
              <Button color="inherit" component={Link} to="/faq">FAQ</Button>
              <Button color="inherit" component={Link} to="/about">About</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default Navbar;
