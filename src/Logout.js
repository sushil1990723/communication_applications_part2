import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    // Clear logged-in user data from localStorage
    localStorage.removeItem('loggedInUser');
    
    // Update state to trigger the redirect
    setLoggedOut(true);
  }, []);

  if (loggedOut) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;
