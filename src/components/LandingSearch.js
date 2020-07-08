import React from 'react';
import { Container, Header } from 'semantic-ui-react'
import SearchBar from './SearchBar'

const LandingSearch = (props) => {
  return (
    <>
      <Container text >
        <Header
          as='h1'
          content='Wax Chromatics'
          style={{
            
            // backgroundSize: 'cover',
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop:  '2em',
          }}
        />
        <Header
          as='h2'
          content='A vinyl collection app'
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em',
            marginBottom: '1em'
          }}
        />
    {/* <br /> */}
        <SearchBar
          hideSearch={props.hideSearch}
          setArtists={props.setArtists} 
        />
  </Container>
    </>
  );
}

export default LandingSearch;
