import React from 'react';
import '../../style/RegistrationForm2.css'; 
import LeftPart from '../../components/Registration/left-part';
import RightPart from '../../components/Registration/right-part2';

const RegistrationForm2 = () => {
    return (
        <div className="registration-page">
            <LeftPart />
            <div className="right-part">
                
             <RightPart />   
            </div>
        </div>
    );
};
export default RegistrationForm2;