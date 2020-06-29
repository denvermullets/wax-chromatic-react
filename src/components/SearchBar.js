// maybe uninstall lodash
import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react'

const handleClick = () => {
  alert ('hi buddy')
  // const oAuthKey = `key=${process.env.REACT_APP_DISCOGS_KEY},`
    // // const oAuthNonce = `oauth_nonce="${Date.now()}",`
    // const oAuthSig = `secret=${process.env.REACT_APP_DISCOGS_SECRET}`
    // // const oAuthSigMethod = `oauth_signature_method="PLAINTEXT",`
    // // const oAuthTime = `oauth_timestamp="${Date.now()}",`
    // // const oAuthCallback = `oauth_callback="https://localhost:3001/profile"`
    
    // const discogsHeaders = {
    //   "Content-Type": "application/json",
    //   "Authorization": `Discogs ${oAuthKey} ${oAuthSig}`,
    //   // "User-Agent": "WaxChromatics/v0.1 +https://localhost:3001/login"
    // }
    
    // const requestOptions = {
    //   method: 'GET',
    //   headers: discogsHeaders,
    // };
      
    // console.log('headers', discogsHeaders)
    // fetch("https://api.discogs.com/database/search?q=Nirvana", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
}

const SearchPage = () => {


  return (
    <>
    <Input 
          action={{
            icon: "search",
            onClick: () => handleClick()
          }}
          // onKeyPress={onKeyPress}
          // icon='search'
          placeholder='Search...' 
          // onChange={this.handleSearchChange}
        />
    </>
  );
}

export default SearchPage;
