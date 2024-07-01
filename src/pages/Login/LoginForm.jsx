
import React from 'react';
//import   '../../style/LoginForm.css';
import LeftPart from '../../components/Login/left-part'; 
import RightPart from '../../components/Login/right-part';

function LoginForm() {
  return (
  <div>
    <div className="login-page">
      <LeftPart />
      <div className="right-part">
      <RightPart />
    </div>
    </div>
    
  </div>
    

  );
}

export default LoginForm;


