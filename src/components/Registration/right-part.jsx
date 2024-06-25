

// import React from 'react';
// import sms from '../../assets/icons/sms.png'; // Assuming icons folder is one level above
// import lockIcon from '../../assets/icons/lockIcon.svg'; // Assuming icons folder is one level above
// import { Link } from 'react-router-dom';
// import Button  from '../common/Button';

// function RightPart() {
//   return (
//     <div className="form-container">
//       <h2 className="text-4xl font-medium">Register</h2>
//       <p className="text-gray-600">Join us with your organization email</p>
//       <div className="input-container flex items-center mb-4">
//         <img src={sms} alt="name" className="w-6 h-6 mr-2" />
//         <input
//           type="text"
//           placeholder="name"
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
//         />
//       </div>
//       <div className="input-container flex items-center mb-4">
//         <img src={lockIcon} alt="Organization Email" className="w-6 h-6 mr-2" />
//         <input
//           type="text"
//           placeholder="Organization Email"
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
//         />
//       </div>
//       <Link to="/RegistrationForm2">
//         <Button text="Next"></Button>
//       </Link>
//       <p className="text-sm mt-4">
//         Already have an account? <Link to="/LoginForm" className="text-blue-500 underline">Login</Link>
//       </p>
//     </div>
//   );
// }

// export default RightPart;


import React, { useState } from 'react';
import sms from '../../assets/icons/sms.png'; // Assuming icons folder is one level above
import lockIcon from '../../assets/icons/lockIcon.svg'; // Assuming icons folder is one level above
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

  const handleNext = () => {
    if (validate()) {
      setFormData({ name, email });
      navigate('/RegistrationForm2');
    }
  };

  return (
    <div className="form-container p-8 bg-white rounded-lg shadow-md">
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

