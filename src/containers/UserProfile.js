import React, { useEffect, useState } from 'react';
import queryString from "query-string";
import { Button } from 'semantic-ui-react'

const waxUrl = 'http://localhost:3000/api/v1'

const UserProfile = () => {
  const [ userInfo, setUserInfo ] = useState()
  
  useEffect(() => {
    const waxChromatics = JSON.parse(localStorage.getItem("waxChromatics"))
    let parsed = queryString.parse(window.location.search)
    console.log(parsed)
    fetch(`${waxUrl}/users/authenticate?oauth_token=${parsed.oauth_token}&oauth_verifier=${parsed.oauth_verifier}&oauth_token_secret=${waxChromatics.oauth_token_secret}`)
      .then(response => response.json())
      .then(json => console.log(json))
  }, []);

  return (
    <>
      Welcome
    </>
  );
}

export default UserProfile;
