import React from 'react';
import '../../style/RegistrationForm2.css'; 
import LeftPart from '../../components/Registration/left-part';
import RightPart from '../../components/Registration/right-part2';

const RegistrationForm2 = ({ formData }) => {
    return (
        <div className="registration-page">
            <LeftPart />
            <div className="right-part">
                
             <RightPart formData={formData} />   
            </div>
        </div>
    );
};
export default RegistrationForm2;