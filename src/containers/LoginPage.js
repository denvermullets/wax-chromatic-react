import React, { useEffect } from 'react';

const LoginPage = () => {
  
  const updateLocalStorage = (info) => {
    localStorage.setItem("waxChromatics", JSON.stringify(info))
    let waxChromatics = JSON.parse(localStorage.getItem("waxChromatics"))
    window.open(waxChromatics.discogs, '_self')
  }
  
  useEffect(() => {
        let waxChromaticsStorage = JSON.parse(localStorage.getItem("waxChromatics" || "{}"))
        // load local storage to see if previously authenticated - tokens don't expire unless revoked by user
        if (!waxChromaticsStorage) {
          // if no access_token found
            fetch('http://localhost:3000/api/v1/users')
              .then(response => response.json())
              .then(fullObject => updateLocalStorage(fullObject))
        }
  }, []);

  return (
    <>
      We should put a disclaimer or explanation about the process here - maybe only if api is slow, otherwise blank page could be fine when not logged in
    </>
  );
}

export default LoginPage;
