import React from 'react';
import '../../style/LoginForm.css';
import LeftPart from '../../components/Login/left-part';
import VerifyOtp from '../../components/Login/verifyOtp';

function VerifyForm() {
  return (
    <div className="registration-page flex">
      <LeftPart />
      <div className="right-part flex-grow">
        <VerifyOtp />
      </div>
    </div>
  );
}

export default VerifyForm;

