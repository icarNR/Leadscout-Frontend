import Results from './components/employee/quizresults.jsx';
import Layout from './layouts/EPLayout.jsx';
import CustomizedProgressBars from './components/common/ProgressBar.jsx';
import BasicTabs from './components/common/tab.jsx';
import PersonalityPage from './pages/employee/employee_Personality.jsx';
import AssessmentPage from './pages/employee/Assessment.jsx';
import HomePage from './pages/employee/employee_Home.jsx';
<<<<<<< HEAD
import Notification from './pages/employee/employee_Notification.jsx';
=======

>>>>>>> 0dc49f8850b6abf6392b7d079b6cbb5b309c13eb
import LoginForm from './pages/Login/LoginForm.jsx';
import RegistrationForm from './pages/Login/RegistrationForm.jsx'
import RegistrationForm2 from './pages/Login/RegistrationForm2.jsx'
import Otp_verify from './pages/Login/Otp_verify.jsx'
import Otp from './pages/Login/Otp.jsx'
import React, { useState } from 'react';
import { createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App(){
  const [formData, setFormData] = useState({});

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/RegistrationForm" element={<RegistrationForm setFormData={setFormData} />} />
          <Route path="/RegistrationForm2" element={<RegistrationForm2 formData={formData} />} />
          <Route path="/employee_Personality" element={<PersonalityPage />} />
          <Route path="/employee_Notification" element={<Notification />} />
          <Route path="/Assessment" element={<AssessmentPage />} />
          <Route path="/employee_Home" element={<HomePage />} />
          <Route path="/Otp_verify" element={<Otp_verify />} />
          <Route path="/Otp" element={<Otp />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );

  

}


export default App;
