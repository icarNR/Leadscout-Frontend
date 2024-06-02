import { PiMaskHappy } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { HiOutlineBellAlert } from "react-icons/hi2";
import React from 'react';
import MenuAppBar from "../components/employee/employeeHeader";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssessmentPage from "../pages/employee/Assessment";
import ClippedDrawer from "../components/employee/employee_sideNavbar";

const icons = [<GoHome />, <PiMaskHappy />, <HiOutlineBellAlert />];

const PageLayout = ({content,pagename,percentage}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',overflowY: 'Hidden' }}>
      {/* Fixed header */}
      <div style={{ height: '60px', backgroundColor: 'lightblue', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <MenuAppBar percentage={percentage} /> 
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Fixed side navbar */}
        <div style={{ width: '140px', height: 'calc(100vh)', position: 'fixed', top: '100px', left: 0, zIndex:90 ,overflow: 'hidden' }}>
          <ClippedDrawer/>
        </div>
        <CssBaseline/>
        {/* Content */}
        <div className='sm:ml-32 mt-16 flex-1 overflow-y-auto' >
          {/* Add your main content here */}
         
            {content}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;

