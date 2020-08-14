import React, { useEffect, useState } from 'react';
import { Header, Container } from 'semantic-ui-react';
import TrackList from '../components/TrackList';
import VariantList from '../components/VariantList';

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

const ReleasePage = (props) => {
  const releaseId = props.location.state.release // discogs release id
  const artistId = props.location.state.artist // WaxDb artist id

  const [ variants, setVariants ] = useState([])
  const [ albumInfo, setAlbumInfo ] = useState([])

  const getReleaseInfo = () => {
    // this is just a way to get the actual album info from discogs since it's not stored in my db yet
    // contains tracklisting and other misc info for parent release
    console.log('checking for albuminfo / master info ', releaseId)
    fetch(`${url}/masters/${releaseId}`, requestOptions)
      .then(response => response.json())
      .then(albumInfo => setAlbumInfo(albumInfo))
      .catch(error => console.log('error getting album info ', error))

  }

  const getRelease = () => {
    // get release variants
    console.log('checking for release ', releaseId)
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    fetch(`${waxUrl}/albums/release?album=${releaseId}&artist=${artistId}`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${waxUser.token}`}})
        .then(response => response.json())
        // .then(r => console.log(r))
        .then(variants => setVariants(variants))
        .catch(error => console.log('error getting artist ', error))
  }

  useEffect(() => {
    console.log('release id', releaseId)
    console.log('artistId', artistId)
    getRelease()
    // getReleaseInfo()
  }, []);

  return (
    <>
      <Container >
      <Header as='h2' style={{marginTop: '1em'}}>
        {/* <Image src={albumInfo ? albumInfo.images[0].resource_url : null} /> */}
        <Header.Content>
          {variants.title}
        <Header.Subheader>{variants.artist}</Header.Subheader>
        </Header.Content>
      </Header>
      
        <VariantList variants={variants.albums}/>      
        {albumInfo ? <TrackList trackList={albumInfo.tracklist} /> : null}

    
      </Container>

    </>
  );
}

export default ReleasePage;
