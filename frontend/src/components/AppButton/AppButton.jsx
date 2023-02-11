import Button from '@mui/material/Button';
import React from 'react';
const AppButton = ({ btnText, onClick, setPopEnter, setPopExit, setLogin }) => {
  return (
    <div
      className="appbutton"
      style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
      <Button style={{ fontSize: '20px' }} variant="contained" color="success" onClick={onClick}>
        {btnText}
      </Button>
    </div>
  );
};

export default AppButton;
