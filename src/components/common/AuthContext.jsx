import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState ? JSON.parse(savedAuthState) : false;
  });

  const [userRole, setUserRole] = useState(() => {
    const savedUserRole = localStorage.getItem('userRole');
    return savedUserRole ? savedUserRole : null;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  useEffect(()=>{
    if(userRole!=localStorage.getItem('userRole'))
    {localStorage.clear();}
  },[localStorage.getItem('userRole')]);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
