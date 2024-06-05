import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import lockIcon from '../../assets/icons/lockIcon.svg';

function RightPart() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Registration successful');
    };

    return (
        <div className="right-part flex items-center justify-center">
            <div className="form-container">
                <h2 className="text-4xl font-medium mb-4">Register</h2>
                <p className="text-gray-600 mb-4">confirm and register</p>
                <div className="input-container flex items-center mb-4">
                    <img src={lockIcon} alt="Password" className="w-6 h-6 mr-2" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="input-container flex items-center mb-4">
                    <img src={lockIcon} alt="Confirm Password" className="w-6 h-6 mr-2" />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <Link to="/LoginForm">
                        <Button text="Register" />
                    </Link>
                </div>
                
            </div>
        </div>
    );
}

export default RightPart;
