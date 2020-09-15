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
        {props.loggedIn ? 
        <SearchBar
          hideSearch={props.hideSearch}
          setArtists={props.setArtists} 
        />
        :
        <Header
          // <a href='/signup'>Sign Up</a>
          as='h3'
          content='Please log-in to start'
          style={{
            fontSize: '1em',
            fontWeight: 'normal',
            marginTop: '1.5em',
            marginBottom: '1em'
          }}
        />
        }
  </Container>
    </>
  );
}

export default LandingSearch;
