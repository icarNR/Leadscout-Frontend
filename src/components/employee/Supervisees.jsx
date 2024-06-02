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

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  maxHeight: '242px', // Adjust this value as needed
  overflowY: 'auto', // Enable vertical scrolling
   
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(7),
    height: theme.spacing(7),
  }));

  export default function InteractiveList() {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false); 
    const [group, setGroup] = useState([]);
    const [showAlert, setShowAlert] = useState(true);

    const toggleAlert = () => {
      setShowAlert(!showAlert);
    };

    useEffect(() => {
      // Try to get the supervisees list from the session storage
      const storedGroup = sessionStorage.getItem('supervisees');
      const userID = sessionStorage.getItem('user_id');
      // If the supervisees list is in the session storage, use it
      if (storedGroup) 
        setGroup(JSON.parse(storedGroup));
      else{
        //If the supervisees list is not in the session storage, fetch it from the database
        fetch(`http://localhost:8000/get_users/${userID}`)
          .then(response => response.json())
          .then(data => {
            // Save the supervisees list in the session storage for future use
            sessionStorage.setItem('supervisees', JSON.stringify(data));
            setGroup(data);
          })
          .catch(error => console.error('Error fetching data: ', error));
  }
    }, []);

    return (
      <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
        <Demo sx={{ background: 'white', borderRadius: '8px', border: '1px solid gray' }}>
          {group && group.length > 0 ? (
            <List dense={dense}>
              {group.map(item => {
                const handleAssessClick = () => {
                  sessionStorage.setItem('assessed_id', item.user_id);
                  console.log("Assessing " + item.user_id);
                  window.location.href = "/Assessment";
                  console.log(item.observed)
                };
  
                return (
                  <ListItem
                    key={item.user_id}
                    // secondaryAction={
                    //   !item.observed && (
                    //     <Alert severity="success" sx={{ my: 'auto' }}>
                    //       Assessed
                    //     </Alert>
                    //   )
                    // }
                  >
                    <ListItemAvatar sx={{ paddingRight: '8px' }}>
                      <Avatar alt={item.name} src={item.image} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ marginLeft: '20px' }}
                      primary={item.user_id}
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemText
                      primary={item.name}
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <RecButton text="Assess" onClick={handleAssessClick} />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography variant="h6" component="div">
              // Display an image or message if no supervisees
            </Typography>
          )}
        </Demo>
      </Box>
    );
  }