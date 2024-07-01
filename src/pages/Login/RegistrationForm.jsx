import React from 'react';
import '../../style/RegistrationForm.css'; 
import LeftPart from '../../components/Registration/left-part';
import RightPart from '../../components/Registration/right-part';

function RegistrationForm({ setFormData }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <LeftPart />
      <RightPart setFormData={setFormData} />
      </div>
    
  );
}

export default RegistrationForm;