import React from 'react';
import '../../style/RegistrationForm.css'; 
import LeftPart from '../../components/Registration/left-part';
import RightPart from '../../components/Registration/right-part';

function RegistrationForm() {
  return (
    <div className="registration-page">
      <LeftPart />
      <div className="right-part">
        <RightPart />
      </div>
    </div>
  );
}

export default RegistrationForm;