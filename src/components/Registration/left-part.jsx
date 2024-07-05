// import React from 'react';
// import firstImage from '../../assets/icons/firstImage.png';

// function LeftPart() {
//   return (
    
//       <div className="hidden md:flex h-full w-1/2 bg-cover" style={{ backgroundImage: `url(${firstImage})` }}>
//         <p className="text-white text-3xl font-bold p-5">LEADSCOUT</p>
//       </div>
//       );
//       }

//       export default LeftPart;

import React from 'react';
import firstImage from '../../assets/icons/firstImage.png';
// Replace with your crown image path

function LeftPart() {
  return (
    <div className="hidden md:flex h-full w-1/2 bg-cover relative" style={{ backgroundImage: `url(${firstImage})` }}>
      {/* <img src={crownImage} alt="Crown" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20" /> */}
      <p className="absolute top-0 flex items-center justify-center w-full h-20 text-white text-3xl font-bold p-5">LEADSCOUT</p>
    </div>
  );
}

export default LeftPart;