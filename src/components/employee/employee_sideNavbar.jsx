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

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};
export default function ResponsiveDrawer(props){
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const links = [
    { text: 'Home', linkName: '/' },
    { text: 'Personality', linkName: '/employee_Personality' },
    { text: 'Notifications', linkName: '/employee_Notification' }
  ];
  
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
        {links.map((link, index)=> (
          <Link to={link.linkName}>
            <ListItem key={link.text} disablePadding>
                <ListItemButton
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px', // Add padding for spacing
                  }}
                  onMouseEnter={(e) => e.currentTarget.childNodes[0].style.color = '#f00'}
                  onMouseLeave={(e) => e.currentTarget.childNodes[0].style.color = 'inherit'}
                >
                  <ListItemIcon
                    sx={{
                      color: 'primary.main',
                      mb: 1,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      fontSize: '25px', // Increase icon size
                    }}
                  >
                    {icons[index]}
                  </ListItemIcon>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      alignSelf: 'center',
                      fontSize: '14px'}}
                  >{link.text}</Typography>
                </ListItemButton>
            </ListItem>
          </Link>
          
        ))}
      </List>  
    </Box>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    
    <Box sx={{ display: 'flex' }}>
    
      <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: 'none' },
              fontSize:30,
              position: 'fixed',
              top: 135,
              left: 45,
              zIndex: 100, // Ensure it's above other elements
            }}       >
              <div className="bg-white rounded-lg shadow-lg p-2"><IoMenu /></div>
    </IconButton>
      <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onTransitionEnd={handleDrawerTransitionEnd}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}
      className="flex sm:hidden"
      >
        {drawer}
      </Drawer>

      
      <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
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

// export default SideNavBar;
