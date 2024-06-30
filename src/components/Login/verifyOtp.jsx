import React, { useState } from 'react';
import axios from 'axios';
import Button from '../common/Button';
import Alert from '@mui/material/Alert';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleReset = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/reset_password', { email, otp, new_password: newPassword });
            setMessage(response.data.message);
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to reset password.');
            setMessage('');
        }
    };

    return (
        <div className="form-container p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <div className="input-container flex items-center mb-4">
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div className="input-container flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div className="input-container flex items-center mb-4">
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
            {message && <Alert severity="success" className="mt-4 w-full">{message}</Alert>}
            {error && <Alert severity="error" className="mt-4 w-full">{error}</Alert>}
            <div className="flex justify-center mt-4">
                <Button onClick={handleReset} text="Reset Password" className="w-full py-2 mb-4" />
            </div>
        </div>
    );
}

export default ResetPassword;
