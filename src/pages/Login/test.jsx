import React, { useContext,useEffect,useState } from 'react';
import { AuthContext } from '../../components/common/AuthContext.jsx' 

const Authenticate = () => {
  const { isAuthenticated, setIsAuthenticated, userRole, setUserRole } = useContext(AuthContext);
  const email = "117@gmail.com"
  const server = import.meta.env.VITE_REACT_APP_SERVER_URL;
  
  const toggleAuthentication = () => {
    setIsAuthenticated(!isAuthenticated);
    console.log(isAuthenticated)
    if(userRole=='user' )
      window.location.href = "/employee_home";
    else
      window.location.href = "/Dashboard";
    };

  const changeRole = () => {
    setUserRole(userRole === 'user' ? 'admin' : 'user');
  };

  useEffect(() => {

    if(isAuthenticated){
      localStorage.setItem('access_token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZWV0aDk4MTJAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJ1c2VyX2lkIjoiMDExIiwiZXhwIjoxNzE5OTIwODI1fQ.JgMCkI3VsYrow5ZkvgqnoNGAKer2tGICwZQxXBZltlo");
      let accessToken =localStorage.getItem('access_token');
      
      fetch(`${server}/${email}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`}
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            localStorage.setItem('name', data.name);
            localStorage.setItem('user_id', data.user_id); //------is this necessary?
            localStorage.setItem('email', data.email);
            localStorage.setItem('position', data.position);
            localStorage.setItem('attempts', data.attempts);
            localStorage.setItem('supervisor', data.supervisor);
            localStorage.setItem('requested', data.requested);
            localStorage.setItem('observed', data.observed);
            localStorage.setItem('allowed_assess', data.allowed_assess);
            localStorage.setItem('department', data.department);
            sessionStorage.clear();
            console.log("data saved")
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });  
      }
  },[isAuthenticated]); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button 
        onClick={toggleAuthentication} 
        style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginBottom: '10px' }}
      >
        {isAuthenticated ? 'Deauthenticate' : 'Authenticate'}
      </button>
      <button 
        onClick={changeRole} 
        style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
      >
        Change Role (Current: {userRole})
      </button>
      {isAuthenticated && <p>Authenticated as {userRole}</p>}
    </div>
  );
  
}  

export default Authenticate;
