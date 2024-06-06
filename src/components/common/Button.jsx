import React from 'react';
import Button from '@mui/material/Button';

function CustomButton({ text, onClick }) {
  const handleClick = () => {
    // Invoke the onClick function when the button is clicked
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleClick} 
    sx={{
      backgroundColor: '#00818A', // Change button color to green
      '&:hover': {
        backgroundColor: '#006B74' // Change button color on hover to a darker green
      }
    }}>
      {text}
    </Button>
  );
}

export default CustomButton;
