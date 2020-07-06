import React from 'react';
import { Card, Button } from 'semantic-ui-react'

const AlbumInfo = (props) => {
  
  // const addToCollection = (album) => {
  //   fetch('https://localhost:3000/', {
  //     method: 'POST',
  //     body: JSON.stringify(album),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8"
  //     } })
  //       .then(response => response.json())
  //   }


  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://freesvg.org/img/1536281106.png'
  }

  // const { title } = props.artistInfo
  const { format, label, released, thumb, title } = props.vinyls
  return (
    <>
        <Card>
          <img src={thumb} onError={addDefaultSrc} height={250} width={250} alt={title} />
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
              <span className='date'>{released}</span>
            </Card.Meta>
            <Card.Description>
              {label}<br />
              {format}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
            <Button 
              basic color='green' 
              // onClick={addToCollection({title: title, released: released, size: 12, amount_pressed: 0, color: 'update', notes: format,  })}
            >
              Add to Collection
            </Button>
            <Button basic color='orange'>
              Add to Wantlist
            </Button>
          </div>
          </Card.Content>
        </Card>
    </>
  );
}

export default AlbumInfo;
