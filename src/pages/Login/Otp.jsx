import React from 'react';
import '../../style/LoginForm.css';
import LeftPart from '../../components/Login/left-part';
import OtpForm from '../../components/Login/otpForm';


function Form_otp() {
  return (
    <div className="registration-page">
      <LeftPart />
      <div className="right-part">
        <OtpForm  />
      </div>
    </div>
  );
}

export default Form_otp;