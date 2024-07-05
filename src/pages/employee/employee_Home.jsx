import { useState, useEffect } from 'react';
import InteractiveList from '../../components/employee/Supervisees';
import CustomButton from '../../components/common/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PageLayout from '../../layouts/EPLayout';
import image1 from '../../assets/employee_home.jpeg'; // Adjust the file extension based on the actual image type
//import { userStore } from '../../store.jsx'// Path to your store
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

  const server = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const [buttonText, setButtonText] = useState('   ');
  const [buttonColor, setButtonColor] = useState('primary');

  const [requested, setRequested] = useState(null);
  const [attempts, setAttempts] = useState(1);
  const [allowed, setAllowed] = useState(false);
  const [assessedId, setAssessedId] = useState("");

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("001");//------------------------
  
  const accessToken = localStorage.getItem('access_token');
  const navigate = useNavigate();

  
  // Change button text and color
  useEffect(() => {
    if (requested && !allowed){ 
      setButtonText('Requested');
      setButtonColor('secondary');}
    else if(requested==false || allowed){
      setButtonText('Attempt');
      setButtonColor('primary');}
  },[allowed, requested]); 


  useEffect(() => {
    sessionStorage.clear()//--------------------------------
    //--------------------------------------------------------
    fetch(`${server}/protected-route`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Protected Data:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    //----------------------------------------------

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
        setName(data.name)
        setUserId(data.user_id) 
        setAssessedId(data.user_id)
        sessionStorage.setItem('assessed_id', userId);//---------------------------     

        console.log(`fetched Requested :${data.requested}`)
        console.log(`fetched Name :${data.name}`)
        console.log(`fetched Id :${data.user_id}`)
        console.log(`fetched Allowed :${data.allowed}`)
        }
    })
    .catch(error => console.error('Error:', error));
  }, []);  

  const handleButtonClick = () => {
 //change this-----------------------------------------------------------------------
        // Navigate to the assessment page
        navigate('/Assessment', { state: { assessedId, userId } });
      
    if(requested==false){
        // Set the `requested` flag to `true` for the current user 
        fetch(`${server}/api/users/${userId}/request`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          } })
        .then(() => {
          setRequested(true)
        });
    
        // Add to the notification dictionary for their supervisor
        fetch(`${server}/add_supervisor_notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
              userID: userId,
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


