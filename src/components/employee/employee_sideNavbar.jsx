// import React from 'react';
import { PiMaskHappy } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';

import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import { Typography } from "@mui/material";
const drawerWidth = '128px';
const icons = [<GoHome />, <PiMaskHappy />, <HiOutlineBellAlert />];

const drawerStyles = {
  backgroundColor: "#DBEDF3",
  color: "#404B69",
};

export default function ResponsiveDrawer(props){


  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const links = [
    { text: 'Home', linkName: '/' },
    { text: 'Personality', linkName: '/employee_Personality' },
    { text: 'Notifications', linkName: '/employee_Notification' }
  ];
  
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  
  const drawer = (
    <div>
      <Toolbar />
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {links.map((link, index) => (
            <Link to={link.linkName} key={link.text}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px',
                    color: selectedIndex === index ? '#00818A' : '#404B69',
                  }}
                  onClick={(event) => handleListItemClick(event, index)}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedIndex === index ? '#00818A' : '#404B69',
                      mb: 1,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      fontSize: '25px',
                    }}
                  >
                    {icons[index]}
                  </ListItemIcon>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      alignSelf: 'center',
                      fontSize: '14px',
                      color: selectedIndex === index ? '#00818A' : '#404B69',
                    }}
                  >
                    {link.text}
                  </Typography>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </div>
  );
  

  return (
    <Box sx={{ display: 'flex' }}>
    
      <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: 'none' },
              fontSize:30,
              position: 'fixed',
              top: 100,
              left: 30,
              zIndex: 100, // Ensure it's above other elements
            }}       >
              <div className="bg-white rounded-lg shadow-lg p-2"><IoMenu /></div>
    </IconButton>

      <Drawer
      variant="temporary"
      open={mobileOpen}
      onTransitionEnd={handleDrawerTransitionEnd}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth , ...drawerStyles}}}
      className="flex sm:hidden"
      >
        {drawer}
      </Drawer>
      
      <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth ,...drawerStyles},
      }}
      className="hidden sm:flex"
    >
      {drawer}
    </Drawer>
  </Box>
  );
}


// function SideNavBar() {
//   return (
//     <div className="side-nav-bar">
//       <ul>
//         <NavItem icon={<GoHome />} text="Home" to="/HR_Dashboard/AdminHome"/>

//         <NavItem icon={<PiMaskHappy />} text="Personality" to="/personality"/>
//         <NavItem icon={<HiOutlineBellAlert />} text="Notifications" to="/notifications"/>
//         {/* Add more navigation links with icons and text as needed */}
//       </ul>
//     </div>
//   );
// }

