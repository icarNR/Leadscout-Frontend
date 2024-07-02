import Layout from './layouts/EPLayout.jsx';
import CustomizedProgressBars from './components/common/ProgressBar.jsx';
import BasicTabs from './components/common/tab.jsx';
import { createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ECriteria from './pages/admin/Employee_Criteria.jsx';
import Skills from './components/admin/Skills.jsx';
import Criteria from './components/admin/CriteriaSkill.jsx';
import MenuAppBarWithoutProgressBar from './components/admin/adminHeader2.jsx';

//styleOverrides
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

const Home = () => <div>Home</div>; // Placeholder Home component

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Ecriteria" element={<ECriteria />} />
    </Routes>
  </BrowserRouter>
);

export default App;
