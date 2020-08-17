import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import ArtistBio from '../components/ArtistBio';
import ReleaseGrid from '../components/ReleaseGrid';

const waxUrl = 'http://localhost:3000/api/v1'

const ArtistProfile = (props) => {
  const artistId = props.location.state.artist.id // from router push
  const [ artistInfo, setArtistInfo ] = useState()
    // first let's get artist profile
  useEffect(() => {
    console.log('checking for artist ', artistId)
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    fetch(`${waxUrl}/artists/${artistId}`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${waxUser.token}`}})
      .then(response => response.json())
      .then(artistInfo => setArtistInfo(artistInfo))
      .catch(error => console.log('error getting artist ', error))
  }, [artistId]);

  return (
    <>
      <ArtistBio 
        name={artistInfo ? artistInfo.name : null}
        profile={artistInfo ? artistInfo.bio : null}
        artistId={artistInfo ? artistInfo.id : null}
        />
      { artistInfo ? 
        <ReleaseGrid
          artistInfo={artistInfo}
          collection={props.collection}
          wantlist={props.wantlist}

      /> 
      : null }
    </>
  );
}

export default withRouter(ArtistProfile)
