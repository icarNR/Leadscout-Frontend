import PropTypes from 'prop-types'; // Import PropTypes
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs({ panelcontent1, panelcontent2 }) {
  const [value, setValue] = React.useState(1);

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div className="flex flex-col overflow-hidden items-center" >
      <div className={`flex border bg-gray-200 items-center border rounded-[5px]`}>     
        <button
          onClick={() => handleChange(0)}
          className={`px-2 py-1  ${value === 0 ? 'bg-white' : 'bg-gray-200'}  w-[90px] border rounded-[5px]`}>
          Me
        </button>
        <button
            onClick={() => handleChange(1)}
            className={`px-2 py-1 ${value === 1 ? 'bg-white' : 'bg-gray-200'} w-[90px] border rounded-[5px]`}>
            Others 
        </button>
      </div>
      <div className="w-[410px]"> 
        {value === 0 && <div className="p-3">{panelcontent1}</div>}
        {value === 1 && <div className="p-3">{panelcontent2}</div>}
      </div>
    </div>
  );
}
  