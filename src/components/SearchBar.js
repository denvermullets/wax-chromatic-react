import React, { useState } from 'react';
import { Input } from 'semantic-ui-react'

// const waxUrl = 'http://localhost:3000/api/v1'
const waxUrl = 'https://api.waxchromatics.com/api/v1'
 

const SearchPage = (props) => {
  const [ search, setSearch ] = useState('')

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeSearch()
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
  
  const executeSearch = () => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    // fetch(`https://api.discogs.com/database/search?q=${search}&type=artist`, requestOptions)
    fetch(`${waxUrl}/artists/search?artist=${search}`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${waxUser.token}`}
    })
      .then(response => response.json())
      .then(results => props.setArtists(results))
      .then(setSearch(''))
      .then(() => props.hideSearch())
      .catch(error => console.log('error', error));
  }

  return (
    <>
      <Input 
        action={{
          icon: "search",
          onClick: () => executeSearch()
        }}
        value={search}
        onKeyPress={onKeyPress}
        placeholder='Search for Artist...' 
        onChange={handleSearchChange}
      />
    </>
  );
}

export default SearchPage;

