import React, { useState ,useEffect} from 'react';
import PageLayout from '../../layouts/EPLayout';
import BasicTabs from '../../components/common/tab';
import Results from '../../components/employee/quizresults'; 
import { Typography } from '@mui/material';
import { VscArrowLeft } from "react-icons/vsc";
import { VscArrowRight } from "react-icons/vsc";
import image1 from '../../assets/Scene-1-16-1024x575.jpg'; // Adjust the file extension based on the actual image type
import axios from 'axios'; // Make sure to install this package
import Alert from '@mui/material/Alert';
import { useSwipeable } from 'react-swipeable';
const data = [
  { imageSrc: image1, bodyText1: '...', bodyText2: '...' },
  { imageSrc: 'image2.jpg', bodyText1: '...', bodyText2: '...'  },
  { imageSrc: 'image3.jpg', bodyText1: '...', bodyText2: '...'  },
  { imageSrc: 'image3.jpg', bodyText1: '...', bodyText2: '...'  },
  { imageSrc: 'image3.jpg', bodyText1: '...', bodyText2: '...'  },
];

data[0].bodyText1="Almost heaven, West Virginia Bluecasssssss Ridge Mountains, Shenandoah RiverLife is old there, older than the treesYounger than the mountains, growin' like a breezeCountry roads, take me homeTo the place I belongWest Virginia, mountain mamaTake me home, country roadsAll my memories gather 'round herMiner's lady, stranger to blue waterDark and dusty, painted on the skyMisty taste of moonshine, teardrop in my eyeCountry roads, take me homeTo the place I belong West Virginia, mountain mama"


const Div1 = ({ imageSrc, bodyText1, bodyText2 }) => (
  <div className="text-sm lg:flex lg:items-center rounded-lg overflow-hidden shadow-lg border bg-red">
    <div className="rounded-l-lg h-[350px] w-[350px] border ">
      <img src={imageSrc} alt="Image" className="w-full h-auto" />
    </div>
    <div style={{ scrollbarWidth: 'none' }} className=" p-4 rounded-r-lg h-[350px] w-[350px] overflow-auto">
      <h2 className="text-lg font-bold mb-2 ">Go Forward</h2>      
      <p >{bodyText1}</p>
    </div>
    <div style={{ scrollbarWidth: 'none' }}  className="p-4 rounded-r-lg h-[350px] w-[350px]">
      <h2 className="text-lg font-bold mb-2">Keep in mind</h2>
      <p>{bodyText2}</p>
    </div>
  </div>
);


const PersonalityPage = () => {

const server = import.meta.env.VITE_REACT_APP_SERVER_URL;

  
const [results, setResults] = useState({
    Extraversion: 0,
    Agreeableness: 0,
    Conscientiousness: 0,
    Neuroticism: 0,
    Openness: 0
  });
  const [averages, setAverages] = useState({
    Extraversion: 0,
    Agreeableness: 0,
    Conscientiousness: 0,
    Neuroticism: 0,
    Openness: 0
  });

  const [selfAssessment,setselfAssessment] = useState(true);
  const [supervisorAssessment,setsupervisorAssessment] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id'); 
    const storedResults = JSON.parse(sessionStorage.getItem('results'));
    const storedAverages = JSON.parse(sessionStorage.getItem('averages'));

    if(storedResults && storedAverages){
      console.log("storedResults");

      console.log(storedResults);
      console.log(storedAverages);
      setAverages(storedAverages);
      setResults(storedResults); }
    console.log("fetching");
    
    Promise.all([
        fetch(`${server}/api/assessment_status/${userId}`),
        fetch(`${server}/send_results/${userId}`),
        fetch(`${server}/send_average_results`)
      ])
      .then(async ([res1, res2, res3]) => {
        console.log("fetched");
        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        

    
        setselfAssessment(data1.self_assessment);
        //sessionStorage.setItem('self_assessment',data1.self_assessment);
        setsupervisorAssessment(data1.supervisor_assessment);
        //sessionStorage.setItem('supervisor_assessment',data1.supervisor_assessment);
        //set results
        const adjustedResults = {
          Extraversion: data2.extraversion,
          Agreeableness: data2.agreeableness,
          Conscientiousness: data2.conscientiousness,
          Neuroticism: data2.neuroticism,
          Openness: data2.openness
        };
        const averageResults = {
          Extraversion: data3.extraversion,
          Agreeableness: data3.agreeableness,
          Conscientiousness: data3.conscientiousness,
          Neuroticism: data3.neuroticism,
          Openness: data3.openness
        };
        setAverages(averageResults);
        sessionStorage.setItem('averages', JSON.stringify(averageResults));
        setResults(adjustedResults);
        sessionStorage.setItem('results', JSON.stringify(adjustedResults));
        console.log(averageResults);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });


  }, []);
  

    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
      setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
    };
    const handleNext = () => {
      setCurrentIndex(prevIndex => (prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex));
    };
    const handlers = useSwipeable({
      onSwipedLeft: () => {
        console.log('Swiped left');
        handleNext();
      },
      onSwipedRight: () => {
        console.log('Swiped right');
        handlePrev();
      },
      preventDefaultTouchmoveEvent: true,
      trackMouse: true
    });
    
    
    const pageContent = (
      <div className="flex flex-col h-full "> {/* Increased space-y from 10 to 20 */}
        {
          supervisorAssessment && !selfAssessment ? 
            <Alert severity="info">Current result is based on supervisor assessment.</Alert> 
          : !supervisorAssessment && selfAssessment ? 
            <Alert severity="info">Current result is based on self assessment.</Alert> 
          : !supervisorAssessment && !selfAssessment ? 
            <Alert severity="warning">Do the assessment to see your results.</Alert> 
          : null
        }
        <div className="flex flex-col items-center pt-20 pb-20" >
            <BasicTabs
              panelcontent1={<Results {...results} />} 
              panelcontent2={<Results {...averages} />} />
        </div>
        <div  {...handlers} className="flex flex-row items-center justify-center  mb-4 space-x-4 flex-1"> 
          <button 
            onClick={handlePrev} 
            className="sm:block px-4 py-4 bg-[#00818A] text-white rounded-md hover:bg-[#006B74]"><VscArrowLeft /></button>
         
            <Div1 {...data[currentIndex]} />
       
          <button 
            onClick={handleNext} 
            className="sm:block px-4 py-4 bg-[#00818A] text-white rounded-md hover:bg-[#006B74]"><VscArrowRight /></button>
        </div>
     </div>
    );
    
    return(<PageLayout content={pageContent} pagename={"Personality"}/>);
  };
  
  export default PersonalityPage;
  