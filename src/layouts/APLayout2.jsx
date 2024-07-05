// APLayout.jsx

import React, { useState } from 'react';
import MenuAppBarWithoutProgressBar from "../components/Admin/employeeHeader";
import ClippedDrawer from "../components/Admin/employee_sideNavbar";
import CssBaseline from '@mui/material/CssBaseline';

const PageLayout = ({ content, pagename }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [mostUsedClicked, setMostUsedClicked] = useState(false);

  const handleDepartmentChange = (department) => {
    console.log("Selected department in PageLayout:", department);
    setSelectedDepartment(department);
  };

  const handleSearchChange = (search) => {
    console.log("Search value in PageLayout:", search);
    setSearchValue(search);
  };

  const handleMostUsedClick = () => {
    console.log("Most Used button clicked in PageLayout");
    setMostUsedClicked(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowY: 'hidden' }}>
      <div style={{ height: '60px', backgroundColor: 'lightblue', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <MenuAppBarWithoutProgressBar 
          onDepartmentChange={handleDepartmentChange} 
          onSearchChange={handleSearchChange}
          onMostUsedClick={handleMostUsedClick}
        />
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: '140px', height: 'calc(100vh)', position: 'fixed', top: '100px', left: 0, zIndex: 90, overflow: 'hidden' }}>
          <ClippedDrawer />
        </div>
        <CssBaseline />
        <div className='sm:ml-32 mt-16 flex-1 overflow-y-auto'>
          {React.cloneElement(content, { selectedDepartment, searchValue, mostUsedClicked })}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
