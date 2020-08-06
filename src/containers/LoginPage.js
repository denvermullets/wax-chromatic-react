import React, { useEffect, useState } from 'react';

const LoginPage = () => {
  
  const [ authToken, setAuthToken ] = useState()

  useEffect(() => {
    console.log('hi buddy')
    fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json())
      .then(authToken => setAuthToken(authToken.discogs))

  }, []);

  useEffect(() => {
    if (authToken) {
      window.open(authToken, '_self')
    }
  }, [authToken]);

  return (
    <>
      We should put a disclaimer or explanation about the process here - maybe only if api is slow, otherwise blank page could be fine when not logged in
    </>
  );
}

export default LoginPage;
