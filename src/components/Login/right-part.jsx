import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import axios from 'axios'; // Import axios
import sms from '../../assets/icons/sms.png';
import lockIcon from '../../assets/icons/lockIcon.svg';

function RightPart() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');
        setError('');

        // Simple email validation
        if (!email.includes('@')) {
            setEmailError('Invalid email address');
            return;
        }

        // Simple password length validation
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        }



        try {
            const response = await axios.post('http://localhost:8000/login', { email, password });
            console.log(response.data); // Handle successful response
        } catch (error) {
            console.error('Error:', error.response.data); // Handle error response
        }
    };

    return (
        <div className="form-container">
            <h2 className="text-4xl font-medium">Welcome</h2>
            <p className="text-gray-600">Login with email</p>
            <div className="input-container flex items-center mb-4">
                <img src={sms} alt="Email" className="w-6 h-6 mr-2" />
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className="input-container flex items-center mb-4">
                <img src={lockIcon} alt="Password" className="w-6 h-6 mr-2" />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            <Button text="Login" onClick={handleSubmit} />
            <p className="text-sm mt-4">
                Don't have an account? <Link to="/RegistrationForm" className="text-blue-500 underline">Register now</Link>
            </p>
        </div>
    );
}

export default RightPart;
