import React from 'react';
import { Card } from 'semantic-ui-react'
import AlbumInfo from './AlbumInfo';

const AlbumGrid = (props) => {
  return (
    <>
      <Card.Group>
        {props.vinyls.map(album => 
          <AlbumInfo 
            vinyls={album}
            artistInfo={props.artistInfo}
          />
          
          )}
        
      </Card.Group>
      
    </>
  );
}

export default AlbumGrid;
