import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { SetBarrier } from '../../services/postdata';

const DialogConfirm = ({ park_id, message, open, setOpen }) => {
  const handleOpenGate = () => {
    SetBarrier(park_id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}>
          Disagree
        </Button>
        <Button
          onClick={() => {
            handleClose();
            handleOpenGate();
          }}
          autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
