import React, { useState } from 'react';
import QuestionComponent from '../../components/employee/questionInput.jsx';
import CustomButton from '../../components/common/Button.jsx';
import PageLayout from '../../layouts/ELayout.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AssessmentPage() {
  
  const server = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const [attempts, setAttempts] = useState(parseInt(sessionStorage.getItem('attempts'), 10));
  const [allowed, setAllowed] = useState(JSON.parse(sessionStorage.getItem('allowed')));
  const user_id= sessionStorage.getItem('user_id'); 
  const assessed_id=sessionStorage.getItem('assessed_id');
  // Total number of questions
  const totalQuestions = 44;
  // Questions per page
  const questionsPerPage = 11;
  
  const navigate = useNavigate();

  useEffect(() => {
 
    if (user_id==assessed_id && !(attempts == 0 || allowed)){
      navigate('/employee_home'); // Redirect to the desired page
    }
    else{
      fetch(`${server}/api/users/${sessionStorage.getItem('user_id')}/attempts`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setAttempts(data.attempts);
          setAllowed(data.allowed);
        })}
      }, [attempts,allowed]);

//definig pronoun
let pronoun;
if (user_id == assessed_id) {
  pronoun = 'You';
} else {
  pronoun = 'They';
}
  
// Array of all questions

  const allQuestions = [
    `${pronoun} are talkative`,
    `${pronoun} tend to find fault with others`,
    `${pronoun} do a thorough job`,
    `${pronoun} are depressed, blue`,
    `${pronoun} are original, come up with new ideas`,
    `${pronoun} are reserved`,
    `${pronoun} are helpful and unselfish with others`,
    `${pronoun} can be somewhat careless`,
    `${pronoun} are relaxed, handle stress well`,
    `${pronoun} are curious about many different things`,
    `${pronoun} are full of energy`,
    `${pronoun} start quarrels with others`,
    `${pronoun} are a reliable worker`,
    `${pronoun} can be tense`,
    `${pronoun} are ingenious, a deep thinker`,
    `${pronoun} generate a lot of enthusiasm`,
    `${pronoun} have a forgiving nature`,
    `${pronoun} tend to be disorganized`,
    `${pronoun} worry a lot`,
    `${pronoun} have an active imagination`,
    `${pronoun} tend to be quiet`,
    `${pronoun} are generally trusting`,
    `${pronoun} tend to be lazy`,
    `${pronoun} are emotionally stable, not easily upset`,
    `${pronoun} are inventive`,
    `${pronoun} have an assertive personality`,
    `${pronoun} can be cold and aloof`,
    `${pronoun} persevere until the task is finished`,
    `${pronoun} can be moody`,
    `${pronoun} value artistic, aesthetic experiences`,
    `${pronoun} are sometimes shy, inhibited`,
    `${pronoun} are considerate and kind to almost everyone`,
    `${pronoun} do things efficiently`,
    `${pronoun} remain calm in tense situations`,
    `${pronoun} prefer work that is routine`,
    `${pronoun} are outgoing, sociable`,
    `${pronoun} are sometimes rude to others`,
    `${pronoun} make plans and follow through with them`,
    `${pronoun} get nervous easily`,
    `${pronoun} like to reflect, play with ideas`,
    `${pronoun} have few artistic interests`,
    `${pronoun} like to cooperate with others`,
    `${pronoun} are easily distracted`,
    `${pronoun} are sophisticated in art, music, or literature`
  ];
  
  const [results, setResults] = useState({
    Extraversion: 0,
    Agreeableness: 0,
    Conscientiousness: 0,
    Neuroticism: 0,
    Openness: 0
  });
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  // State to keep track of selected options for each question
  const [selectedOptions, setSelectedOptions] = useState(Array(totalQuestions).fill(0));
  // Calculate the index of the first and last question on the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  // Current questions to display
  const currentQuestions = allQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Function to handle option change
  const handleOptionChange = (questionIndex, optionIndex) => {
    console.log(`Selected option for question ${questionIndex + 1}: ${optionIndex}`);
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);  };
    
  // Calculate progress percentage based on selected options
    const answeredQuestions = selectedOptions.filter(option => option !== 0).length;
    const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

// Function to navigate to the next page
  const handleNextPage = () => {
    // Check if all questions on the current page have been answered
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentPageAnswers = selectedOptions.slice(startIndex, endIndex);
    
    // Check if any question on the current page is unanswered (value is 0)
    //const allAnswered = currentPageAnswers.every(option => option !== 0);
    let allAnswered = 1
    if (allAnswered) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page

    } else {
      alert('Please answer all questions before proceeding to the next page.');
    }
  };

// Function to handle submit click
const handleSubmit = async () => {
  console.log('Button clicked!');
 
  // Define the user ID and the answers to send
  const answersData = {
    user_id: user_id, 
    assessed_id: assessed_id,
    answers: selectedOptions
  };
  try {
    // Send the data to the backend using fetch
    fetch(`${server}/submit_assessment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answersData)
    })
    .then(response => response.json())
    .then(data => setResults(data))

    //add to admin notifications
    fetch(`${server}/add_admin_notification`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: answersData.assessed_id,
        ntype: 'assess_complete'
    })

      })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    
    // Add to the notification their supervisor
    if (answersData.user_id==answersData.assessed_id){
      fetch(`${server}/add_supervisor_notification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userID: answersData.user_id,
            ntype: 'sef_assess_done'
        })
        })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

      window.location.href = "/employee_Personality";    
    }  
    // Add to the notification dictionary for the employee
    else{
      fetch(`${server}/add_employee_notification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userID: answersData.user_id,
            superviseeID: answersData.assessed_id,
            ntype: 'supervisor_assess_done'
        })
        })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

      window.location.href = "/";
    }

  } catch (error) {
    console.error('Error submitting assessment:', error);
  }  
  };


  // Determine if the current page is the last page
  const isLastPage = currentPage === Math.ceil(totalQuestions / questionsPerPage);

 // Update the render section to remove the 'Previous' button
 const pageContent = (
  <content className="no-select" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {currentQuestions.map((question, index) => (
      <QuestionComponent
        key={index + indexOfFirstQuestion} // Ensure each component has a unique key
        questionIndex={index + indexOfFirstQuestion}
        questionText={question} // Use the string directly
        onChange={handleOptionChange}
      />
    ))}
    <div style={{ margin: '80px 0', display: 'flex', justifyContent: 'center' }}>
      {/* Spacer element to separate the buttons */}
      <div style={{ width: '20px' }} />
      {/* Conditionally render the 'Next' or 'Submit' button */}
      {!isLastPage ? (
        <CustomButton text="Next" onClick={handleNextPage} />
      ) : (
        <CustomButton text="Submit" onClick={handleSubmit} />
      )}
    </div>
  </content>
);

  return <PageLayout content={pageContent} percentage={progressPercentage} pagename={AssessmentPage}/>;
}

export default AssessmentPage;