import React from 'react';
import { Header } from 'semantic-ui-react'

const ArtistProfile = (props) => {
  const { title, id } = props.location.state.artist
  return (
    <>
      <Header size='large'>{title}</Header>
    </>
  );
}

export default ArtistProfile;
