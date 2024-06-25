import React from 'react';
import '../../style/RegistrationForm.css'; 
import LeftPart from '../../components/Registration/left-part';
import RightPart from '../../components/Registration/right-part';

function RegistrationForm({ setFormData }) {
  return (
    <div className="registration-page">
      <LeftPart />
      <div className="right-part">
        <RightPart setFormData={setFormData} />
      </div>
    </div>
  );
}

export default RegistrationForm;