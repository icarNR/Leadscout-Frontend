import React from 'react';
import { useState, useEffect } from 'react';
function QuestionComponent({ questionIndex, questionText, onChange }) {

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onChange(questionIndex, option); };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to handle window resize
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  // Add event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define the threshold width where you want to increase the margin
  const thresholdWidth = 800;

  // Calculate the margin based on the window width
  const margin = windowWidth > thresholdWidth ? '30px' : '10px';

  return (
    <div style={{ marginBottom: '10px', width:'100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop: '100px' }}>
    <div style={{ marginBottom: '25px', width: '100%',textAlign: 'center' }}>
       <span style={{ fontSize: '25px' }}>{questionText}</span>
    </div>
      <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center', width: '100%'}}>
        <span >Disagree</span>
        {[1, 2, 3, 4, 5].map(option => (
          <label key={option} style={{ display: 'flex', alignItems: 'center', marginRight: margin , marginLeft: margin }}>
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={option}
              onChange={() => handleOptionChange(option)}
              style={{ display: 'none' }}
            />
            <span style={{  
              width: '40px', 
              height: '40px', 
              borderRadius: '90%', 
              border: '2px solid #00818A', 
              cursor: 'pointer', 
              backgroundColor: selectedOption === option ? '#71EFD8' : 'transparent', 
              borderColor: selectedOption === option ? '#71EFD8' : '#00818A',
              transition: 'background-color 0.3s ease', 
              transform: selectedOption === option ? 'scale(1.1)' : 'scale(1)' 
            }}></span>
          </label>
        ))}
        <span>Agree</span>
      </div>
    </div>
  );
}

export default QuestionComponent;
