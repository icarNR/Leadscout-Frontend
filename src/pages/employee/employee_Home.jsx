import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InteractiveList from '../../components/employee/Supervisees';
import CustomButton from '../../components/common/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PageLayout from '../../layouts/EPLayout';
import image1 from '../../assets/employee_home.jpeg'; // Adjust the file extension based on the actual image type

const server = 'http://localhost:8000';

const WelcomeText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  font: 'Roboto',
  fontWeight: 'bold',
  fontSize: 50
}));


const HomePage = ({ name }) => {
  const [buttonText, setButtonText] = useState('Attempt');
  const [buttonColor, setButtonColor] = useState('primary');
  const [requested, setRequested] = useState(null);
  const [attempts, setAttempts] = useState(1);
  const [allowed, setAllowed] = useState(false);
  
  useEffect(() => {
    let userId="001"//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   user_id
    sessionStorage.setItem('user_id', userId);
    sessionStorage.setItem('assessed_id', userId);

    // Fetch the number of attempts, requeested and allowed for the current user
    fetch(`${server}/api/users/${userId}/attempts`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.requested && !data.allowed){ //check id already requested and if its allowed
        // Change button text and color
        setButtonText('Requested');
        setButtonColor('secondary');
       }
       setRequested(data.requested)
       setAttempts(data.attempts)
       setAllowed(data.allowed)
    })
    .catch(error => console.error('Error:', error));
  }, []);  // The empty array means this useEffect will run once when the component mounts

  const handleButtonClick = () => {
    console.log(attempts)
    console.log(requested)
    if (attempts == 0 || allowed) { //change this-----------------------------------------------------------------------
        // Navigate to the assessment page
        window.location.href = "/Assessment";}
    else if(requested==false){
        // Set the `requested` flag to `true` for the current user and send notifications 
        fetch(`${server}/api/users/${sessionStorage.getItem('user_id')}/request`, { method: 'POST' })
        .then(() => {
          setButtonText('Requested'); 
          setButtonColor('secondary'); 
        });
    
        // Add the username to the notification dictionary for their supervisor
        // fetch(`${server}/api/supervisors/${supervisorId}/notifications`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ userId: userId })
        // });
            }
        
    }

  const pageContent=(
  <div className={`flex  flex-col lg:flex-row lg:h-full `}>    
        {/* Left Part */}
        <div className="flex flex-col items-center flex-grow h-full lg:h-full ">
          <div style={{marginBottom: 55, marginTop:60}}>
          <Avatar sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}>N</Avatar>
          </div>
          <div class="mb-8 font-roboto font-bold text-4xl text-center">
            Welcome {name}
            </div>
            <div className="w-full flex justify-center px-10 mb-10">
              <InteractiveList className="min-h-"/>
            </div>
        </div>

        {/* Right Part */}
        <div className="bg-cover bg-center flex flex-col items-center justify-center flex-grow gap-7 h-screen lg:h-full" style={{ backgroundImage: `url(${image1})`}}>
            <div>
              <div variant="body1" className="text-3xl font-bold text-center">
                BE HONEST!
              </div>
              <Typography className="text-center">
                We Can Help You Through Improvements
              </Typography>
            </div>
            <div>
                <CustomButton color={buttonColor} text= {buttonText} onClick={handleButtonClick}>Button</CustomButton>
            </div>
        </div>
    </div>
  );
  return(<PageLayout content={pageContent} pagename={"Home"}/>);
};

export default HomePage;


