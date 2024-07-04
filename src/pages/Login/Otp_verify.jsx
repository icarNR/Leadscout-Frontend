import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import LeftPart from '../../components/Registration/left-part';

const OtpVerify = ({ formData }) => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!otp) tempErrors.otp = "OTP is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleVerify = async () => {
    if (validate()) {
      try {
        const response = await fetch('http://127.0.0.1:800/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            otp: otp,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          if (data.status === "success") {
            alert("OTP verified successfully! Proceeding to registration..");
            navigate('/RegistrationForm2');
          } else {
          alert(data.detail); // Display error message from the backend
        }
      }else{
        throw new Error("Failed to verify OTP"); // Handle failed request
      }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during OTP verification");
      }
    }
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <LeftPart />
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8">
        <h2 className="text-4xl font-medium mb-2">OTP Verification</h2>
        <p className="text-gray-600 mb-6">Enter the OTP sent to your email</p>
        <div className="input-container flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={`w-full border ${errors.otp ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
        </div>
        {errors.otp && <p className="text-red-500 text-sm mb-4">{errors.otp}</p>}
        <Button onClick={handleVerify} text="Verify OTP" className="w-full py-2 mb-4" />
      </div>
    </div>
  );
};

export default OtpVerify;
