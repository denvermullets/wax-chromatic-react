import React, { useEffect, useState } from 'react';
import { Card, Container, Divider, Header } from 'semantic-ui-react'
import AlbumInfo from './AlbumInfo';
import LoadingAlbum from './LoadingAlbum';
import ReleaseInfo from './ReleaseInfo';

const waxUrl = 'http://localhost:3000/api/v1'

const ReleaseGrid = (props) => {
  const { d_artist_id, name } = props.artistInfo

  const [ artistReleases, setArtistReleases ] = useState([])

  const getArtistReleases = () => {
    // get first page of artist releases and then filter out non parent (master) releases and only albums that are mainly by artist (no collabs cur)
    console.log(`loading ${name} releases`, d_artist_id)
    fetch(`${waxUrl}/releases/artist/${d_artist_id}`)
      .then(response => response.json())
      .then(artistReleases => setArtistReleases(artistReleases))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getArtistReleases()
  }, [props]);

  return (
    <>
    <Container>
        <Divider />
        <Card.Group centered={true} >
          {/* {props.loading ? <LoadingAlbum /> : null} */}
          {artistReleases ? artistReleases.map(release => 
            <ReleaseInfo 
            key={release.id}
            release={release}
            artistInfo={props.artistInfo}
            />
            
            ) : null}
          
        </Card.Group>
        
    </Container>
      
    </>
  );
}

export default ReleaseGrid;
