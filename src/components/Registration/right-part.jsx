
import React, { useState } from 'react';
import sms from '../../assets/icons/sms.png'; 
import lockIcon from '../../assets/icons/lockIcon.svg'; 
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';

function RightPart({ setFormData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!name) tempErrors.name = "Name is required";
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // const handleNext = () => {
  //   if (validate()) {
  //     setFormData({ name, email });
  //     navigate('/RegistrationForm2');
  //   }
  // };


  const handleNext = async () => {
    if (validate()) {
      try {
        const response = await fetch('http://127.0.0.1:800/sign_up1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.status === "success") {
            setFormData({ name, email });
            navigate('/Otp_verify');
          } else {
            alert(data.message); // Display error message from the backend
          }
        } else {
          alert("Failed to send OTP"); // Handle failed request
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending OTP");
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8">
      <h2 className="text-4xl font-medium mb-2">Register</h2>
      <p className="text-gray-600 mb-6">Join us with your organization email</p>
      <div className="input-container flex items-center mb-4">
        <img src={sms} alt="name" className="w-6 h-6 mr-2" />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
      </div>
      {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}
      <div className="input-container flex items-center mb-4">
        <img src={lockIcon} alt="Organization Email" className="w-6 h-6 mr-2" />
        <input
          type="text"
          placeholder="Organization Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
      </div>
      {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}
      <Button onClick={handleNext} text="Next" className="w-full py-2 mb-4" />
      <p className="text-sm mt-4">
        Already have an account? <Link to="/LoginForm" className="text-blue-500 underline">Login</Link>
      </p>
    </div>
  );
}

export default RightPart;

