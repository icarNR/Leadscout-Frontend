import React from 'react';
import firstImage from '../../assets/icons/firstImage.png';

function LeftPart() {
  return (
    <div className="left-part h-full w-1/2 bg-cover" style={{ backgroundImage: `url(${firstImage})` }}>
    {/* <div className="logo" style={{ backgroundImage: `url(${MagnifyingGlass})` }}> */}
      <p>LEADSCOUT</p>
      </div>
    
  );
}

export default LeftPart;
