import React from 'react';
import { Container, Header } from 'semantic-ui-react'

const ArtistBio = (props) => {
  return (
    <>
      <Container text >
        <Header size='large'>{props.name}</Header>
        <Header as='h2'>Biography</Header>
          <p>
            {props.profile}
          </p>
      </Container>
    </>
  );
}

export default ArtistBio;
