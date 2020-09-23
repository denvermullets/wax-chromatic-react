import React from 'react';
import { Container, Header, Message } from 'semantic-ui-react'
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
        <Message warning>
          <Message.Header>You must be logged in to search</Message.Header>
          <p>You can use the username / pw to test: waxdemo</p>
        </Message>
        }
  </Container>
    </>
  );
}

export default LandingSearch;
