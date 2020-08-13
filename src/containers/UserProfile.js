import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react'
import queryString from "query-string";

const waxUrl = 'http://localhost:3000/api/v1'

// user clicks on 'authenticate w/discogs' button
// get temp tokens from wax api and discogs
// redirect user to discogs to login with their user / pw
// discogs redirects back to wax and we store perm tokens in db

const UserProfile = (props) => {
  const [ discogsAuth, setDiscogsAuth ] = useState(false)

  const updateLocalStorage = (info) => {
    localStorage.setItem("waxChromatics", JSON.stringify(info))
    window.open(info.discogs, '_self')
  }
  
  const getTempTokens = () => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    fetch(`${waxUrl}/oauth/temp`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${waxUser.token}`,
      }
    })
        .then(response => response.json())
        .then(fullObject => updateLocalStorage(fullObject))
  }

  useEffect(() => {
    // check to see if user has previously authenticated with discogs
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    if (waxUser.discogs_id.length > 1) {
      setDiscogsAuth(true)
    }
  }, []);
  
  useEffect(() => {
    // check to see if profile page is loaded from a redirect from discogs - if so proceed to final oauth step
    let uri = window.location.toString()
    if (uri.indexOf("?") > 0) {
      const waxUser = JSON.parse(localStorage.getItem("waxUser"))
      let parsed = queryString.parse(window.location.search)
      const waxChromatics = JSON.parse(localStorage.getItem("waxChromatics" || "{}"))
      fetch(`${waxUrl}/oauth/success?oauth_token=${parsed.oauth_token}&oauth_verifier=${parsed.oauth_verifier}&oauth_token_secret=${waxChromatics.oauth_token_secret}&wax=${waxUser.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${waxUser.token}`,
        }
    })
    .then(response => response.json())
    .then(setDiscogsAuth(true))
    }
  }, []);

  return (
    <>
      Welcome {props.username}
      <br />
      {discogsAuth ? 
        <Button content='Connected w/Discogs' disabled />
         :
        <Button 
          content="Connect to Discogs" 
          onClick={() => getTempTokens()}
        />
      
      }
    </>
  );
}

export default UserProfile;
