import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { SendLogin } from '../services/postdata';

const LoginPopup = ({ setOpen, open, setLogin, setUserName }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClosedata = () => {
    console.log(username.value);
    console.log(password.value);
    if (username.value !== '' && password.value !== '') {
      SendLogin(username.value, password.value);
      setUserName(username.value);
      setOpen(false);
    } else {
      username.value = '';
      password.value = '';
    }
    setLogin(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          {/* <form> */}
          <TextField
            autoFocus
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="username"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          {/* </form> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClosedata}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default LoginPopup;
