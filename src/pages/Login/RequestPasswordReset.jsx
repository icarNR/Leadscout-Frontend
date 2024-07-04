import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import LeftPart from '../../components/Registration/left-part';

function RequestPasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleRequest = async () => {
        setLoading(true); // Start loading

        try {
            const response = await axios.post('http://127.0.0.1:800/request_password_reset', { email });
            if (response.data.status === 'success') {
                setMessage(response.data.message);
                setError('');
                navigate('/ResetPassword');
            } else {
                setError(response.data.message || 'Failed to request OTP.');
                setMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to request OTP. Please check your network connection');
            setMessage('');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex h-screen">
            <LeftPart />
            <div className="form-container p-8 bg-white rounded-lg shadow-md max-w-md mx-auto w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Request Password Reset</h2>
                <div className="input-container flex items-center mb-4">
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    />
                </div>
                {message && <Alert severity="success" className="mt-4 w-full">{message}</Alert>}
                {error && <Alert severity="error" className="mt-4 w-full">{error}</Alert>}
                <div className="flex justify-center mt-4">
                    <Button onClick={handleRequest} text={loading ? 'Requesting...' : 'Request OTP'} className="w-full py-2 mb-4" disabled={loading} />
                </div>
            </div>
        </div>
    );
}

export default RequestPasswordReset;

