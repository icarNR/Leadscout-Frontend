
import React from 'react';
import LeftPart from '../../components/Login/left-part'; 
import RightPart from '../../components/Login/right-part';

function LoginForm() {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <LeftPart />
      <RightPart />
        
      </div>

  );
}

export default LoginForm;


