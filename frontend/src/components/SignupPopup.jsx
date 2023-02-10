import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SendRegister } from '../services/postdata';

const SignupPopup = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClosedata = () => {
    console.log(username.value);
    console.log(password.value);
    console.log(credit_num.value);
    console.log(cvv.value);
    console.log(expire.value);
    if (
      username.value !== '' &&
      credit_num.value !== '' &&
      password.value !== '' &&
      cvv.value !== '' &&
      expire.value !== ''
    ) {
        // SendRegister(username.value,password.value,credit_num.value)
      setOpen(false);
    } else {
      username.value = '';
      credit_num.value = '';
      password.value = '';
      cvv.value = '';
      expire.value = '';
    }
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Signup
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Signup</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="username"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="credit_num"
            label="Credit Card number"
            type="text"
            fullWidth
            variant="standard"
            max="4"
            inputProps={{ maxLength: 16, max: 4 }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cvv"
            label="CVV"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 3 }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="expire"
            label="Expiry Date"
            type="month"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClosedata}>Signup</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SignupPopup;
/*{/*  
    
      </div>*/
