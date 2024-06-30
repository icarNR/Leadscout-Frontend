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

  return (
    <div className="mb-2 w-full mx-auto flex flex-col items-center mt-24 ">
      <div className="mb-6 w-full text-center">
        <span className="text-2xl">{questionText}</span>
      </div>
      <div className="flex justify-center items-center w-full ">
        <span>Disagree</span>
        {[1, 2, 3, 4, 5].map(option => (
          <label key={option} className="flex items-center mx-2 md:mx-8">
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={option}
              onChange={() => handleOptionChange(option)}
              className="hidden"
            />
            <span className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 cursor-pointer transition-transform duration-300 ${selectedOption === option ? 'bg-teal-300 border-teal-300 scale-110' : 'border-teal-600'}`}></span>
          </label>
        ))}
        <span>Agree</span>
      </div>
    </div>
  );
  
}

export default QuestionComponent;
