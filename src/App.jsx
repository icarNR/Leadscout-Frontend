import Results from './components/employee/quizresults.jsx';
import Layout from './layouts/EPLayout.jsx';
import CustomizedProgressBars from './components/common/ProgressBar.jsx';
import BasicTabs from './components/common/tab.jsx';
import PersonalityPage from './pages/employee/employee_Personality.jsx';
import AssessmentPage from './pages/employee/Assessment.jsx';
import HomePage from './pages/employee/employee_Home.jsx';
import Notification from './pages/employee/employee_Notification.jsx';
import Notification2 from './pages/admin/admin_notification.jsx';

import LoginForm from './pages/Login/LoginForm.jsx';
import RegistrationForm from './pages/Login/RegistrationForm.jsx'
import RegistrationForm2 from './pages/Login/RegistrationForm2.jsx'
import Otp_verify from './pages/Login/Otp_verify.jsx' 
import RequestPasswordReset from './pages/Login/RequestPasswordReset.jsx'
import ResetPassword from './pages/Login/ResetPassword.jsx';
import EmployeeCriteria from './pages/admin/Employee_Criteria.jsx';
import React, { useState } from 'react';
import { createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute.jsx' 
import Authenticate from './pages/Login/test.jsx';
import { AuthProvider } from './components/common/AuthContext.jsx' 
import Dashboard from './pages/admin/Dashboard.jsx';

function App() {

  const [formData, setFormData] = useState({});

  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>

            <Route path="/" element={<Authenticate />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/RegistrationForm" element={<RegistrationForm setFormData={setFormData} />} />
            <Route path="/RegistrationForm2" element={<RegistrationForm2 formData={formData} />} />
            <Route path="/Otp_verify" element={<Otp_verify formData={formData} />} />
            <Route path= "/RequestPasswordReset" element={<RequestPasswordReset />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />

            <Route element={<ProtectedRoute allowedRoles={['user']} />}>
              <Route path="/employee_Personality" element={<PersonalityPage />} />
              <Route path="/Assessment" element={<AssessmentPage />} />
              <Route path="/employee_Home" element={<HomePage />} />
              <Route path="/employee_Notification" element={<Notification />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Employee_Criteria" element={<EmployeeCriteria />} />
              <Route path="/admin_notification" element={<Notification2 />} />
            </Route>

          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );

  

}


export default App;
