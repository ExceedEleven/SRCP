import Button from '@mui/material/Button';
import React from 'react';
const AppButton = ({ btnText, setPopEnter, setPopExit, setLogin }) => {
  return (
    <Button variant="contained" color="success">
      {btnText}
    </Button>
  );
};

export default AppButton;
