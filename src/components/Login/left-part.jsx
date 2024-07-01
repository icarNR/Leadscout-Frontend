import React from 'react';
import firstImage from '../../assets/icons/firstImage.png';

function LeftPart() {
  return (
    <div className="hidden md:flex h-full w-1/2 bg-cover" style={{ backgroundImage: `url(${firstImage})` }}>

      <p className="text-white text-3xl font-bold p-5">LEADSCOUT</p>
      </div>
    
  );
}

export default LeftPart;
