// Employee_Criteria.jsx

import React, { useState, useEffect } from 'react';
import MenuAppBarWithoutProgressBar from "../../components/admin/adminHeader2";
import ClippedDrawer from "../../components/admin/adminSideNavbar";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Criteria from '../../components/admin/CriteriaS';
import Skills from '../../components/admin/Skills';
import Recent from '../../components/admin/Recent';
import '../../components/admin/tailwind.css';
import PageLayout from "../../layouts/ACLayout.jsx";



function EmployeeCriteria() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [mostUsedClicked, setMostUsedClicked] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState({ id: null, name: '' });

  useEffect(() => {
  }, [selectedDepartment, searchValue, mostUsedClicked]);

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(Array.from(department).join(''));
    console.log(department)
    
  };

  const handleSearchChange = (search) => {
    setSearchValue(search);
    console.log(search)
  };

  const handleMostUsedClick = () => {
    setMostUsedClicked(prev => !prev);
    console.log("Mostclicked")
  };

  const handleCriteriaSelect = (criteria) => {
    setSelectedCriteria({ name: criteria.name, id: criteria.id });
    console.log("Mostclhandsuckiticked")
  };

  const pageContent=(
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowY: 'hidden' }}>
  <CssBaseline />
  <div className='flex-1 overflow-y-auto'>
    <div className="flex h-screen flex-row ">
        {/* left part */}
      <div className="flex flex-col items-center flex-grow h-full lg:h-full border">
        <div style={{ marginTop: '50px' }} className="w-full flex justify-center px-10 mb-10 ">
          <Criteria 
            onSelect={handleCriteriaSelect}
            department={selectedDepartment}
            searchTerm={searchValue}
            sortByUsage={mostUsedClicked}
          />
        </div>
      </div>
      {/* right part */}
      <div className="bg-cover bg-center w-[340px] flex flex-col items-start justify-top gap-7 h-screen lg:h-full p-5 border" style={{ alignItems: 'flex-start' }}>
        <div style={{ marginTop: '70px' }}>
          <Recent />
        </div>
        <div style={{ marginTop: '10px'}}>
          <Typography variant="h6" component="h2" gutterBottom>
            <pre><b> {selectedCriteria.name}</b></pre>
          </Typography>
          <Skills criteriaId={selectedCriteria.id} />
        </div>
      </div>
    </div>
  </div>
</div>
  );

  return (
    <PageLayout
      content={pageContent}
      handleDepartmentChange={handleDepartmentChange}
      handleSearchChange={handleSearchChange}
      handleMostUsedClick={handleMostUsedClick}
    />);
};

export default EmployeeCriteria;