import React, { useEffect } from 'react';

const LoginPage = () => {
  
  useEffect(() => {
    const oAuthKey = `oauth_consumer_key="${process.env.REACT_APP_DISCOGS_KEY}",`
    const oAuthNonce = `oauth_nonce="${Date.now()}",`
    const oAuthSig = `oauth_signature="${process.env.REACT_APP_DISCOGS_SECRET}&",`
    const oAuthSigMethod = `oauth_signature_method="PLAINTEXT",`
    const oAuthTime = `oauth_timestamp="${Date.now()}",`
    const oAuthCallback = `oauth_callback="https://localhost:3001/profile"`
    
    const discogsHeaders = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": oAuthKey + oAuthNonce + oAuthSig + oAuthSigMethod + oAuthTime + oAuthCallback,
      "User-Agent": "WaxChromatics/v0.1 +https://localhost:3001/login",
      // "Access-Control-Allow-Origin": "*"
    }
    
    const requestOptions = {
      method: 'GET',
      headers: discogsHeaders,
    };
      
    console.log('headers', discogsHeaders)
    fetch("https://api.discogs.com/oauth/request_token", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
  })
  

  return (
    <>
      Hi, did you login buddy
    </>
  );
}

export default LoginPage;
