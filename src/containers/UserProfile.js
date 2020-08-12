import React, { useEffect } from 'react';
// import queryString from "query-string";
// import { Button } from 'semantic-ui-react'

// const waxUrl = 'http://localhost:3000/api/v1'

const UserProfile = (props) => {
  
  // useEffect(() => {
    
    // if (!props.username) {
    //   console.log('UserProfile::useEffect - should only fire on new account login, not repeat visitor')
    //   const waxChromatics = JSON.parse(localStorage.getItem("waxChromatics" || "{}"))
    //   let parsed = queryString.parse(window.location.search)
    //   fetch(`${waxUrl}/users/authenticate?oauth_token=${parsed.oauth_token}&oauth_verifier=${parsed.oauth_verifier}&oauth_token_secret=${waxChromatics.oauth_token_secret}`)
    //   .then(response => response.json())
    //   .then(userInfo => {
    //     localStorage.setItem('waxChromatics', JSON.stringify(userInfo))
    //     props.updateUsername(userInfo.name)
    //   })
    //   // .then(props.updateUserInfo())
    // } else {
    //   const waxChromatics = JSON.parse(localStorage.getItem("waxChromatics" || "{}"))
    //   console.log('should load username on reload without getting access token')
    //   props.updateUsername(waxChromatics.name)      
    // } 
  // }, []);

  // useEffect(() => {
  //   const waxChromatics = JSON.parse(localStorage.getItem("waxChromatics" || "{}"))
  //   console.log('loaded 2nd localstorage')
  //   props.updateUsername(waxChromatics.name)
  // }, []);

  return (
    <>
      Welcome {props.username}
    </>
  );
}

export default UserProfile;
