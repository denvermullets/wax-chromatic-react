import React from 'react';
import { Container, Header } from 'semantic-ui-react'
import Members from '../containers/Members';

const ArtistBio = (props) => {
  return (
    <>
      <Container text >
        <Header size='huge'>{props.name}</Header>
        <Header size='medium'>Biography</Header>
          <p>
            {props.profile}
          </p>

        <Members artistId={props.artistId}/>
      </Container>
    </>
  );
}

export default ArtistBio;
