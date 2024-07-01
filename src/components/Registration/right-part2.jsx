
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import lockIcon from '../../assets/icons/lockIcon.svg';
import Button from '../common/Button';

function RegistrationForm2({ formData }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    // const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

const validate = () => {
    let tempErrors = {};
    if (!password){
        tempErrors.password = "Password is required";
    }else if (password.length < 8) tempErrors.password = "Password must be at least 8 characters";  

    if (!confirmPassword) {tempErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
};

const handleRegister = async () => {
    
    if (validate()) {
        try {
            const response = await fetch('http://127.0.0.1:800/sign_up1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: password,
            }),
            });

        const data = await response.json();
        if (data.status === "success") {

            alert(data.message);// Display success message from the backend
            navigate('/LoginForm');// Navigate to login form
        
            
        } else {
            alert(data.message);// Display error message from the backend
        }
        } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during registration");
        }
    }
};

return (
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8">
        <h2 className="text-4xl font-medium mb-2">Register</h2>
        <p className="text-gray-600 mb-6">Confirm and register</p>
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
        <div className="input-container flex items-center mb-4">
            <img src={lockIcon} alt="Confirm Password" className="w-6 h-6 mr-2" />
            <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>}
        <Button onClick={handleRegister} text="Register" className="w-full py-2 mb-4" />
        <p className="text-sm mt-4">
            Already have an account? <Link to="/LoginForm" className="text-blue-500 underline">Login</Link>
        </p>
        </div>
    );
}

export default RegistrationForm2;

