// maybe uninstall lodash
import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react'


const SearchPage = (props) => {
  const [ search, setSearch ] = useState()

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeSearch()
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
  
  const executeSearch = () => {
  
    const discogsKey = `key=${process.env.REACT_APP_DISCOGS_KEY},`
    const discogsSecret = `secret=${process.env.REACT_APP_DISCOGS_SECRET}`
    
    const discogsHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Discogs ${discogsKey} ${discogsSecret}`,
      "User-Agent": "WaxChromatics/v0.1 +https://localhost:3001/login"
    }
    
    const requestOptions = {
      method: 'GET',
      headers: discogsHeaders,
    };
      
    fetch(`https://api.discogs.com/database/search?q=${search}&type=artist`, requestOptions)
      .then(response => response.json())
      // .then(result => console.log(result))
      .then(results => props.setArtists(results))
      .catch(error => console.log('error', error));
  }

  return (
    <>
    <Input 
          action={{
            icon: "search",
            onClick: () => executeSearch()
          }}
          onKeyPress={onKeyPress}
          placeholder='Search...' 
          onChange={handleSearchChange}
        />
    </>
  );
}

export default SearchPage;

