import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const HeadBar = ({ isLogin, setLogin, setPopLogin, setPopSignUp, userName }) => {
  const handleLogin = () => {
    setPopLogin(true);
  };
  const handleSignUp = () => {
    setPopSignUp(true);
  };

  // useEffect(() => {
  //   const token = document.cookie.split('=')[1];
  //   if (token) {
  //     setLogin(true);
  //   }
  //   setParkId(data.data.result.park_id);
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {isLogin ? `Welcome ${userName}` : 'Welcome to the App'}
          </Typography>
          {!isLogin && (
            <Button color="inherit" onClick={handleSignUp}>
              Sign-Up
            </Button>
          )}
          {!isLogin && (
            <Button color="inherit" onClick={handleLogin}>
              Sign-In
            </Button>
          )}
          {isLogin && (
            <Button
              color="inherit"
              onClick={() => {
                setLogin(false);
                document.cookie = 'token=; path=/;';
              }}>
              Sign-Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeadBar;
