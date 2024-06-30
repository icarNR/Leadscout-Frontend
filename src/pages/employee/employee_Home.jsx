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
//import { userStore } from '../../store.jsx'// Path to your store




const HomePage = () => {

  const server = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const [buttonText, setButtonText] = useState('   ');
  const [buttonColor, setButtonColor] = useState('primary');
  const [requested, setRequested] = useState(null);
  const [attempts, setAttempts] = useState(1);
  const [allowed, setAllowed] = useState(false);
  const [name, setName] = useState("Nisal Ravindu");

  const accessToken = sessionStorage.getItem('access_token');

  useEffect(() => {
    //console.log(JSON.parse(sessionStorage.getItem('requested')))
    console.log(" guckme")
    if (requested && !allowed){ //check id already requested and if its allowed
      // Change button text and color
      setButtonText('Requested');
      setButtonColor('secondary');
     }
    else if(requested==false || allowed){
      setButtonText('Attempt');
      console.log(buttonText)
      setButtonColor('primary');
      console.log(buttonColor)
    }
  },[allowed, requested]); 

  useEffect(() => {
    sessionStorage.clear()//--------------------------------
    let userId="001"//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   user_id
    sessionStorage.setItem('user_id', userId);
    sessionStorage.setItem('assessed_id', userId);

    if(sessionStorage.getItem('requested')){
      console.log(' sesh is here')
      setRequested(JSON.parse(sessionStorage.getItem('requested')));
      setAllowed(JSON.parse(sessionStorage.getItem('allowed')));
    }
    
      // Fetch the number of attempts, requeested and allowed for the current user
    fetch(`${server}/api/users/${userId}/attempts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
    .then(response => response.json())
    .then(data => {
        if(data){
        setRequested(data.requested)
        setAttempts(data.attempts)
        setAllowed(data.allowed)  
        if (data.requested !== undefined) {
          sessionStorage.setItem('requested', data.requested);
        }
        if (data.attempts !== undefined) {
            sessionStorage.setItem('attempts', data.attempts);
        }
        if (data.allowed !== undefined) {
            sessionStorage.setItem('allowed', data.allowed);
        }
        
        console.log("fetched")}
        //console.log(data.requested)

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
        // Set the `requested` flag to `true` for the current user 
        fetch(`${server}/api/users/${sessionStorage.getItem('user_id')}/request`, { method: 'POST' })
        .then(() => {
          setRequested(true)
          sessionStorage.setItem('requested', true);
        });
    
        // Add to the notification dictionary for their supervisor
        fetch(`${server}/add_supervisor_notification`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              userID: sessionStorage.getItem('user_id'),
              ntype: 'assess_req'
          })
          })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));    
        }
    }

  const pageContent=(
  <div className={`flex  flex-col lg:flex-row lg:h-full `}>    
        {/* Left Part */}
        <div className="flex flex-col items-center flex-grow h-full lg:h-full ">
          <div style={{marginBottom: 35, marginTop:60}}>
          <Avatar sx={{ bgcolor: '#DBEDF3', width: 100, height: 100 ,border: '7px solid #649DAD'}}>N</Avatar>
          </div>
          <div className=" font-bold text-4xl text-center text-[#649DAD] uppercase">
            Welcome!
          </div>
          <div className="mb-5  font-bold text-2xl text-center text-[#404B69] uppercase">
            {name}
          </div>
            <div className="w-full flex justify-center items-center px-10 mb-10 flex-grow">
              <InteractiveList className=""/>
            </div>
        </div>

        {/* Right Part */}
        <div className="bg-cover bg-center flex flex-col items-center justify-center flex-grow gap-7 h-screen lg:h-full" style={{ backgroundImage: `url(${image1})`}}>
            <div>
              <div variant="body1" className="text-3xl font-bold text-[#404B69] text-center">
                BE HONEST!
              </div>
              <Typography className="text-center text-[#404B69] ">
                We Can Help You Through Improvements
              </Typography>
            </div>
            <div>
                <CustomButton color={buttonColor} text= {buttonText} onClick={handleButtonClick}></CustomButton>
            </div>
        </div>
    </div>
  );
  return(<PageLayout content={pageContent} pagename={"Home"}/>);
};

export default HomePage;


