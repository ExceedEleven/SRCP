import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const HeadBar = ({ isLogin, setLogin, setPopLogin, setPopSignUp }) => {
  const handleLogin = () => {
    setPopLogin(true);
  };
  const handleSignUp = () => {
    alert('Sign Up');
    setPopSignUp(true);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {isLogin ? `Welcome` : 'Welcome to the App'}
          </Typography>
          <Button color="inherit" onClick={handleSignUp}>
            Sign-Up
          </Button>
          <Button color="inherit" onClick={handleLogin}>
            Sign-In
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeadBar;
