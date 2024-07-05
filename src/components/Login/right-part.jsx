
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import sms from '../../assets/icons/sms.png';
import lockIcon from '../../assets/icons/lockIcon.svg';
import Button from '../common/Button';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        if (!email) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = "Email address is invalid";
        }

        if (!password) {
            tempErrors.password = "Password is required";
        } else if (password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = async () => {
        if (validate()) {
            try {
                const response = await axios.post('http://127.0.0.1:800/login_token',
                    new URLSearchParams({ username: email, password: password }),
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
                    
                const { access_token, refresh_token, token_type, role } = response.data;

                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('token_type', token_type);

                if (rememberMe) {
                    localStorage.setItem('email', email,'access_token',access_token,'refresh_token',refresh_token,'token_type',token_type);
                } else {
                    localStorage.removeItem('email');
                }

                if (role === 'admin') {
                    navigate('/Dasboard');
                } else {
                    navigate('/employee_Home');
                }
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
                setErrors({ general: 'Failed to login. Please check your credentials.' });
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8">
            <h2 className="text-4xl font-medium mb-2">Welcome</h2>
            <p className="text-gray-600 mb-6">Login with email</p>
            <div className="input-container flex items-center mb-4">
                <img src={sms} alt="Email" className="w-6 h-6 mr-2" />
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
            </div>
            {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}
            <div className="input-container flex items-center mb-4">
                <img src={lockIcon} alt="Password" className="w-6 h-6 mr-2" />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
            </div>
            {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}
            {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                />
                <label className="text-gray-700">Remember Me</label>
            </div>
            <div className="flex justify-center">
                <Button onClick={handleLogin} text="Login" className="w-full py-2 mb-4" />
            </div>
            <div className="text-sm mt-4 text-center">
                <Link to="/RequestPasswordReset" className="text-blue-500 underline">Forgot Password?</Link>
            </div>
            <p className="text-sm mt-4 text-center">
                Don't have an account? <Link to="/RegistrationForm" className="text-blue-500 underline">Register now</Link>
            </p>
        </div>
    );
}

export default LoginForm;
