import Results from './components/employee/quizresults.jsx';
import Layout from './layouts/EPLayout.jsx';
import CustomizedProgressBars from './components/common/ProgressBar.jsx';
import BasicTabs from './components/common/tab.jsx';
import PersonalityPage from './pages/employee/employee_Personality.jsx';
import AssessmentPage from './pages/employee/Assesment.jsx';
import HomePage from './pages/employee/employee_Home.jsx';
import LoginForm from './pages/Login/LoginForm.jsx';
import RegistrationForm from './pages/Login/RegistrationForm.jsx'
import RegistrationForm2 from './pages/Login/RegistrationForm2.jsx'
import Notification from './pages/notification/Notification.jsx'

import { createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//styleOverrides
export const theme = createTheme({
  typography: {
    fontSize: 12, // Adjust as needed
  },
  palette: {
    primary: {
      main: '#00695c',
      light: '#757ce8',
      dark: '#002884',
      contrastText: '#fff',
    }
  }
});

function App(){
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/RegistrationForm2" element={<RegistrationForm2 />} />
          <Route path="/Notification" element={<Notification />} />
          <Route  path="/employee_Personality" element={<PersonalityPage />} /> 
          <Route path="/Assessment" element={<AssessmentPage />} />
          <Route path="/employee_Home" element={<HomePage />} />
        </Routes>
      </div> 
    </BrowserRouter>
  );

  //return <Results Openness={75} Consciousness={80} Extraversion={65} Agreeableness={90} Neuroticism={50} />

}

export default App;
