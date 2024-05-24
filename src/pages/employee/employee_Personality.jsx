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

const data = [
  { imageSrc: image1, bodyText1: 'In literary theory, a text is any object that can be "read", whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing. It is a set of signs that is available to be reconstructed by a reader if sufficient interpretants are available.', bodyText2: 'Body text 3' },
  { imageSrc: 'image2.jpg', bodyText1: 'Body text 2', bodyText2: 'Body text 2'  },
  { imageSrc: 'image3.jpg', bodyText1: 'Body text 3', bodyText2: 'Body text 1'  },
  // Add more data as needed
];



const Div1 = ({ imageSrc, bodyText1, bodyText2 }) => (
  <div className="text-sm lg:flex rounded-lg overflow-hidden shadow-lg ">
    <div className="rounded-l-lg h-64 w-64 border">
      <img src={imageSrc} alt="Image" className="w-full h-auto" />
    </div>
    <div style={{ scrollbarWidth: 'none' }} className=" p-4 rounded-r-lg h-64 w-64 overflow-auto">
    <h2 className="text-lg font-bold mb-2 ">Go Forward</h2>      <p>{bodyText1}</p>
    </div>
    <div style={{ scrollbarWidth: 'none' }}  className="p-4 rounded-r-lg h-64 w-64">
      <h2 className="text-lg font-bold mb-2">Keep in mind</h2>
      <p>{bodyText2}</p>
    </div>
  </div>
);


const PersonalityPage = () => {
  
  const [results, setResults] = useState({
    Extraversion: 0,
    Agreeableness: 0,
    Conscientiousness: 0,
    Neuroticism: 0,
    Openness: 0
  });

  const [dualAssessment,setdualAssessment] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id'); 
    const storedResults = sessionStorage.getItem('results');

    //if (!storedResults) {
      Promise.all([
        fetch(`http://localhost:8000/api/dual_assessment/${userId}`),
        fetch(`http://localhost:8000/send_results/${userId}`)
      ])
      .then(async ([res1, res2]) => {
        const data1 = await res1.json();
        const data2 = await res2.json();
    
        setdualAssessment(data1.dual_assessment);
        sessionStorage.setItem('dual_assessment',data1.dual_assessment);
        //set results
        const adjustedResults = {
          Extraversion: data2.extraversion,
          Agreeableness: data2.agreeableness,
          Conscientiousness: data2.conscientiousness,
          Neuroticism: data2.neuroticism,
          Openness: data2.openness
        };
        setResults(adjustedResults);
        sessionStorage.setItem('results', JSON.stringify(adjustedResults));

      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });

      // Try to get the results from the session storage
    //}
    //else{
      // setResults(JSON.parse(storedResults));
      // setdualAssessment(sessionStorage.getItem('dual_assessment'));
    //}

  }, []);
  

    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
      setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
    };
    
    const handleNext = () => {
      setCurrentIndex(prevIndex => (prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex));
    };
    
    const pageContent = (
      <div className={`flex flex-col h-full p-10 space-y-10`}> 
      {dualAssessment ? null: <Alert severity="info">Current result is based on self assessmet.</Alert> }
      <div className={'flex flex-col  items-center'}  >
          <BasicTabs
            panelcontent1={<Results {...results} />} 
            panelcontent2={<Results {...results} />} />
      </div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="px-4 py-2 bg-blue-500 text-white rounded-md"><VscArrowLeft /></button>
        <Div1 {...data[currentIndex]} />
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-md"><VscArrowRight /></button>
      </div>
      </div>
    );
    
    return(<PageLayout content={pageContent} pagename={"Personality"}/>);
  };
  
  export default PersonalityPage;
  