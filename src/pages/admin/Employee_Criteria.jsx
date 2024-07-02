// Employee_Criteria.jsx

import React, { useState, useEffect } from 'react';
import MenuAppBarWithoutProgressBar from "../../components/Admin/employeeHeader";
import ClippedDrawer from "../../components/Admin/employee_sideNavbar";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Criteria from '../../components/admin/CriteriaSkill';
import Skills from '../../components/admin/Skills';
import Recent from '../../components/admin/Recent';
import '../../components/Admin/tailwind.css';

const EmployeeCriteria = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [mostUsedClicked, setMostUsedClicked] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState({ id: null, name: '' });

  useEffect(() => {
  }, [selectedDepartment, searchValue, mostUsedClicked]);

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
  };

  const handleSearchChange = (search) => {
    setSearchValue(search);
  };

  const handleMostUsedClick = () => {
    setMostUsedClicked(prev => !prev);
};

  const handleCriteriaSelect = (criteria) => {
    setSelectedCriteria({ name: criteria.name, id: criteria.id });
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
        <div style={{ width: '140px', height: 'calc(100vh)', position: 'fixed', top: '60px', left: 0, zIndex: 90, overflow: 'hidden' }}>
          <ClippedDrawer />
        </div>
        <CssBaseline />
        <div className='sm:ml-32 mt-16 flex-1 overflow-y-auto'>
          <div className="flex flex-col lg:flex-row lg:h-full">
            <div className="flex flex-col items-center flex-grow h-full lg:h-full">
              <div style={{ marginTop: '50px' }} className="w-full flex justify-center px-10 mb-10">
                <Criteria 
                  onSelect={handleCriteriaSelect}
                  department={selectedDepartment}
                  searchTerm={searchValue}
                  sortByUsage={mostUsedClicked}
                />
              </div>
            </div>
            <div className="bg-cover bg-center flex flex-col items-start justify-top flex-grow gap-7 h-screen lg:h-full p-5" style={{ alignItems: 'flex-start' }}>
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
    </div>
  );
};

export default EmployeeCriteria;
