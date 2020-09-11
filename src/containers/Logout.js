import React, { useEffect } from 'react';
import { Redirect } from 'react-router'

const Logout = (props) => {

  useEffect(() => {
    localStorage.clear()
    props.updateUsername('')
    props.userLoggedIn()
    
  // added props dependency  
  }, [props]);

  return (
    <>
      ~Logging out~
      { props.loggedIn ? <Redirect to='/' /> : null }
    </>
  );
}

export default Logout;
