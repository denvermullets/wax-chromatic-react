import React from 'react';
import { Card, Container, Divider } from 'semantic-ui-react'
import AlbumInfo from './AlbumInfo';
import LoadingAlbum from './LoadingAlbum';

const AlbumGrid = (props) => {
  return (
    <>
      
    <Container>
      <Divider />
        <Card.Group centered={true} >
          {props.loading ? <LoadingAlbum /> : null}
          {props.vinyls ? props.vinyls.map(album => 
            <AlbumInfo 
            key={album.id}
            vinyls={album}
            artistInfo={props.artistInfo}
            />
            
            ) : null}
          
        </Card.Group>
        
    </Container>
      
    </>
  );
}

export default AlbumGrid;
