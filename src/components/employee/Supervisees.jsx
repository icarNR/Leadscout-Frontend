import * as React from 'react';
import { useEffect,useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Margin } from '@mui/icons-material';
import RecButton from '../common/Button.jsx';
import Alert from '@mui/material/Alert';
import image1 from '../../assets/OIG4.n6XXUv.jpeg';

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }
// function generate(group, element) {
//   return group.map(item =>
//     React.cloneElement(element, {
//       key: item.id,
//       name: item.name,   
//       image: item.image,
//     })
//   );
// }

const getInitials = (fullName) => {
  const names = fullName.split(' ');
  const lastName = names.pop();
  const initials = names.map(name => name.charAt(0).toUpperCase()).join(' ');
  return `${initials} ${lastName}`;
};


const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(7),
    height: theme.spacing(7),
  }));

  export default function InteractiveList() {

    const server = import.meta.env.VITE_REACT_APP_SERVER_URL;

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false); 
    const [group, setGroup] = useState([]);

    // const toggleAlert = () => {
    //   setShowAlert(!showAlert);
    // };

    useEffect(() => {
      // Try to get the supervisees list from the session storage
      const storedGroup = localStorage.getItem('supervisees');
      const userID = sessionStorage.getItem('user_id');
      // If the supervisees list is in the session storage, use it
      if (storedGroup) 
        setGroup(JSON.parse(storedGroup));
      else{
        //If the supervisees list is not in the session storage, fetch it from the database
        fetch(`${server}/get_users/${userID}`)
          .then(response => response.json())
          .then(data => {
            // Save the supervisees list in the session storage for future use
            localStorage.setItem('supervisees', JSON.stringify(data));
            setGroup(data);
          })
          .catch(error => console.error('Error fetching data: ', error));
  }
    }, []);

    return (
      <Box className={`min-w-[300px] sm:flex-grow sm:max-w-[500px] bg-white rounded-lg max-h-[216px] overflow-y-auto p-[7px]  ${group && group.length > 0 ? 'border-2 border-gray-100 shadow-inner' : 'border-2 border-white'}`}>       
           {group && group.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            {group.map(item => {
              
              const handleAssessClick = () => {
                sessionStorage.setItem('assessed_id', item.user_id);
                console.log("Assessing " + item.user_id);
                window.location.href = "/Assessment";
                console.log(item.observed);
              };
              return (
                <div key={item.user_id} style={{ display: 'flex', alignItems: 'center', padding: '5px 10px'}}>
                  <div style={{ marginRight: '20px' }}>
                  <Avatar alt={getInitials(item.name)} src={item.image} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px'}}>
                  <div className="  w-[50px]"style={{ marginRight: '30px', overflowX: 'hidden'}}>{item.user_id}</div>
                  <div className="hidden sm:block  md:w-[150px] w-[130px]"style={{overflowX: 'hidden',whiteSpace: 'nowrap' }}>{getInitials(item.name)}</div>
                  </div>
                  <button 
                    style={{ marginLeft: 'auto', backgroundColor: 'teal', color:'white', padding: '5px 20px', borderRadius: '5px'}} 
                    onClick={handleAssessClick}
                  >
                    Assess
                  </button>
                </div>
              );
            })}
          </div>
          
          ) : (
            <div class="overflow-hidden w-full h-[196px]">
              <img src={image1} alt="Image" class="object-contain w-full h-full" />
            </div>

          )}
 
      </Box>
    );
  }