import React from 'react';
import { Card } from 'semantic-ui-react'
import AlbumInfo from './AlbumInfo';

const AlbumGrid = (props) => {
  return (
    <>
      <Card.Group>
        {props.vinyls ? props.vinyls.map(album => 
          <AlbumInfo 
            key={album.id}
            vinyls={album}
            artistInfo={props.artistInfo}
          />
          
          ) : null}
        
      </Card.Group>
      
    </>
  );
}

export default AlbumGrid;
