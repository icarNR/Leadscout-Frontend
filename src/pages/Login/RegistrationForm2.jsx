import React from 'react';
import LeftPart from '../../components/Registration/left-part';
import RightPart from '../../components/Registration/right-part2';

const RegistrationForm2 = ({ formData }) => {
    return (
        <div className="flex h-screen flex-col md:flex-row">
            <LeftPart />
                
            <RightPart formData={formData} />   
            </div>
        
    );
};
export default RegistrationForm2;