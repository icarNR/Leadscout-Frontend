import React, { useContext,useEffect } from 'react';
import { AuthContext } from '../../components/common/AuthContext.jsx' 

const Authenticate = () => {
  const { isAuthenticated, setIsAuthenticated, userRole, setUserRole } = useContext(AuthContext);

  const toggleAuthentication = () => {
    setIsAuthenticated(!isAuthenticated);
    if(isAuthenticated){
      sessionStorage.setItem('access_token', 'your_access_key_here');
      console.log(sessionStorage.getItem('access_token', 'your_access_key_here'))
    }
    };
  


  const changeRole = () => {
    setUserRole(userRole === 'user' ? 'admin' : 'user');
  };
  useEffect(() => {
    console.log(isAuthenticated)
  },[isAuthenticated]); 
  return (
    <div>
      <button onClick={toggleAuthentication}>
        {isAuthenticated ? 'Deauthenticate' : 'Authenticate'}
      </button>
      <button onClick={changeRole}>
        Change Role (Current: {userRole})
      </button>
      {isAuthenticated && <p>Authenticated as {userRole}</p>}
    </div>
  );
};

export default Authenticate;
