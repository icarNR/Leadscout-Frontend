import { createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';

// Style overrides
export const theme = createTheme({
  palette: {
    primary: {
      main: '#00695c',
      light: '#757ce8',
      dark: '#002884',
      contrastText: '#fff',
    }
  }
});

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Uncomment and add other routes if needed */}
          {/* <Route path="/employee_Personality" element={<PersonalityPage />} />
          <Route path="/Assesment" element={<AssessmentPage />} />
          <Route path="/employee_Home" element={<HomePage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
