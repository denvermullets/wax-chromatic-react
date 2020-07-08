import React, { useEffect, useState } from 'react';
import { Card, Button } from 'semantic-ui-react'
import throttledQueue from 'throttled-queue'

const waxUrl = 'http://localhost:3000/api/v1'

const AlbumInfo = (props) => {
  const [ waxAlbumId, setWaxAlbumId ] = useState()

  const addToCollection = (album) => {
    console.log(props)
    // getWaxAlbumId()
    fetch(`${waxUrl}/collection_albums/`, {
      method: 'POST',
      body: JSON.stringify(album),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      } })
        .then(response => response.json())
        .catch(error => console.log('error', error))
    }
  
    const addToWantlist = (album) => {
    fetch(`${waxUrl}/wantlist_albums/`, {
      method: 'POST',
      body: JSON.stringify(album),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      } })
        .then(response => response.json())
        .catch(error => console.log('error', error))
    }

  // const getWaxAlbumId = () => {
  //   // if it's already in our db we don't need to look it up
  //   const throttle = throttledQueue(1, 1000); // at most make 1 request every .5 seconds.
  //     throttle(() => {  
  //       if (props.vinyls.d_album_id > 0){
  //         console.log('found waxdb album id')
  //         setWaxAlbumId(props.vinyls.id)
  //       } else {
  //         console.log('getting waxdb album id')
  //         fetch(`${waxUrl}/albums/${props.vinyls.id}`)
  //           .then(response => response.json())
  //           .then(album => setWaxAlbumId(album.id))
  //           .catch(error => console.log('error fetching album from AlbumInfo.js', error))
  //       }
  //     })
  // }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://freesvg.org/img/1536281106.png'
  }

// useEffect(() => {
//   getWaxAlbumId()
// }, []);


  const { format, label, released, thumb, title, id } = props.vinyls
  return (
    <>
        <Card>
          <img src={thumb ? thumb : 'https://freesvg.org/img/1536281106.png'} onError={addDefaultSrc} height={250} width={250} alt={title} />
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
              <span className='date'>{released}</span>
            </Card.Meta>
            <Card.Description>
              {label ? label : props.vinyls.cat_no}<br />
              {/* {format ? format : props.vinyls.size}<br /> */}
              {props.vinyls.notes}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
            <Button 
              basic color='green' 
              onClick={() => addToCollection({ collection_id: 1, album_id: id })}
            >
              Add to Collection
            </Button>
            <Button 
              basic color='orange'
              onClick={() => addToWantlist({ wantlist_id: 1, album_id: id})}  
            >
              Add to Wantlist
            </Button>
          </div>
          </Card.Content>
        </Card>
    </>
  );
}

export default AlbumInfo;
