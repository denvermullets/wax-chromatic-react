import React, { useState, useEffect } from 'react';
// import throttledQueue from 'throttled-queue'
import ArtistBio from '../components/ArtistBio';
import ReleaseGrid from '../components/ReleaseGrid';

const url = 'https://api.discogs.com'
const waxUrl = 'http://localhost:3000/api/v1'
const discogsKey = `key=${process.env.REACT_APP_DISCOGS_KEY},`
const discogsSecret = `secret=${process.env.REACT_APP_DISCOGS_SECRET}`

const requestOptions = {
  method: 'GET',
  headers: new Headers({
    "User-Agent": "WaxChromatics/v0.1 +https://waxchromatics.com",
    "Accept": "application/vnd.discogs.v2.plaintext+json",
    "Content-Type": "application/json",
    "Authorization": `Discogs ${discogsKey} ${discogsSecret}`,
  })
}

const ArtistProfile = (props) => {
  const artistId = props.location.state.artist.id // from router push

  const [ artistInfo, setArtistInfo ] = useState()

  const loadArtistInfo = () => {
    // get artist information
    console.log('checking for artist ', artistId)
    fetch(`${waxUrl}/artists/${artistId}`)
      .then(response => response.json())
      .then(artistInfo => setArtistInfo(artistInfo))
      // .then(setArtistInfoLoaded(true))
      // .then(setLoading(true))
      .catch(error => console.log('error getting artist ', error))
  }

  ////
    // first let's get artist profile
  useEffect(() => {
    loadArtistInfo()    
  }, [artistId]);


  // let sortedVinyls = vinyls.sort((a,b) => { return a.released < b.released ? -1 : 1 })
  return (
    <>
        
      <ArtistBio 
        name={artistInfo ? artistInfo.name : null}
        profile={artistInfo ? artistInfo.bio : null}
        />

      { artistInfo ? 
        <ReleaseGrid
        artistInfo={artistInfo}
      /> 
      : null }


      {/* <AlbumGrid centered={true}
        // vinyls={vinyls ? vinyls : null}
        vinyls={sortedVinyls ? sortedVinyls : null}
        artistInfo={artistInfo ? artistInfo : null}
        loading={loading}
        />  */}

    </>
  );
}

export default ArtistProfile;
