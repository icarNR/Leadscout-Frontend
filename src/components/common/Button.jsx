import React from 'react';
import Button from '@mui/material/Button';

function CustomButton({ text, onClick }) {
  const handleClick = () => {
    // Invoke the onClick function when the button is clicked
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      {text}
    </Button>
  );
}

function RecButton({ text, onClick }) {
  const handleClick = () => {
    // Invoke the onClick function when the button is clicked
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleClick} >
      {text}
    </Button>
  );
}

export default CustomButton;
