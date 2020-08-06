import React, { useEffect } from 'react';
import queryString from "query-string";

const waxUrl = 'http://localhost:3000/api/v1'

const UserProfile = () => {
  
  
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
      You're logged in?
    </>
  );
}

export default UserProfile;
