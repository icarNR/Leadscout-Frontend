

import React from 'react';
import sms from '../../assets/icons/sms.png'; // Assuming icons folder is one level above
import lockIcon from '../../assets/icons/lockIcon.svg'; // Assuming icons folder is one level above
import { Link } from 'react-router-dom';
import Button  from '../common/Button';

function RightPart() {
  return (
    <div className="form-container">
      <h2 className="text-4xl font-medium">Register</h2>
      <p className="text-gray-600">Join us with your organization email</p>
      <div className="input-container flex items-center mb-4">
        <img src={sms} alt="Employee ID" className="w-6 h-6 mr-2" />
        <input
          type="text"
          placeholder="Employee ID"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="input-container flex items-center mb-4">
        <img src={lockIcon} alt="Organization Email" className="w-6 h-6 mr-2" />
        <input
          type="text"
          placeholder="Organization Email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <Link to="/RegistrationForm2">
        <Button text="Next"></Button>
      </Link>
      <p className="text-sm mt-4">
        Already have an account? <Link to="/LoginForm" className="text-blue-500 underline">Login</Link>
      </p>
    </div>
  );
}

export default RightPart;
