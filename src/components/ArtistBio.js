import React from 'react';
import { Container, Header } from 'semantic-ui-react'

const ArtistBio = (props) => {
  return (
    <>
      <Container text >
        <Header size='huge'>{props.name}</Header>
        <Header size='medium'>Biography</Header>
          <p>
            {props.profile}
          </p>
      </Container>
    </>
  );
}

export default ArtistBio;
