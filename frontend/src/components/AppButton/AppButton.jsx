import Button from '@mui/material/Button';
import React from 'react';
const AppButton = ({ btnText, onClick, setPopEnter, setPopExit, setLogin }) => {
  return (
    <Button variant="contained" color="success" onClick={onClick}>
      {btnText}
    </Button>
  );
};

export default AppButton;
