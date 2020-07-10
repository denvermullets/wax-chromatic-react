import React, { useEffect, useState } from 'react';
import { Item, Label, Button} from 'semantic-ui-react'

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

const VariantListItem = (props) => {
  const { thumb, title, cat_no, released, d_album_id, notes, id } = props.vinyl

  const [ vinyl, setVinyl ] = useState([])
  const [ inCollection, setInCollection ] = useState(false)
  const [ inWantList, setInWantList ] = useState(false)

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://freesvg.org/img/1536281106.png'
  }

  const checkAgainstWantlist = () => {
    console.log('checking wantlist to see if on list')
    props.wantlist.forEach(record => {
      if (record.album_id === props.vinyl.id ){
        setInWantList(true)
      } else {
        setInWantList(false)
      }
    })
  }

  const checkAgainstCollectionlist = () => {
    console.log('checking wantlist to see if on list')
    props.collection.forEach(record => {
      if (record.album_id === props.vinyl.id ){
        setInCollection(true)
      } else {
        setInCollection(false)
      }
    })
  }
  
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
        // .then(props.checkCollectionlist())
        .then(props.updateCount())
        .then(setInCollection(true))
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
      // .then(props.checkWantlist())
      .then(props.updateCount())
      .then(setInWantList(true))
      .catch(error => console.log('error', error))
  }

  const removeFromWantlist = () => {
    fetch(`${waxUrl}/wantlist_albums/${id}`)
      .then(response => response.json())
      .then(foundRecord => {
        fetch(`${waxUrl}/wantlist_albums/${foundRecord.id}`, {
          method: 'DELETE'
        })
          // .then(props.checkWantlist())
          .then(props.updateCount())
          .then(setInWantList(false))

      })
  }

  const removeFromCollection = () => {
    fetch(`${waxUrl}/collection_albums/${id}`)
      .then(response => response.json())
      .then(foundRecord => {
        fetch(`${waxUrl}/collection_albums/${foundRecord.id}`, {
          method: 'DELETE'
        })
          // .then(props.checkCollectionlist())
          .then(props.updateCount())
          .then(setInCollection(false))
      })
  }

  const loadVariantInfo = () => {
    // 6273710
    console.log('loading variants')
    fetch(`${url}/releases/${d_album_id}`, requestOptions)
      .then(response => response.json())
      .then(vinyl => setVinyl(vinyl))
  }

  useEffect(() => {
    loadVariantInfo()
  }, []);

  useEffect(() => {
    checkAgainstWantlist()
    checkAgainstCollectionlist()
  }, []);

  
  return (
    <>
      <Item>
          <Item.Image src={thumb ? thumb : 'https://freesvg.org/img/1536281106.png'} onError={addDefaultSrc} />
          <Item.Content>
            <Item.Header as='a'>{title}</Item.Header>
            <Item.Meta>
              {released + " - " + cat_no }
            </Item.Meta>
            <Item.Description>
              {notes}
              <br /><br/>
              {vinyl.notes_plaintext}
            </Item.Description>
            <Item.Extra>
              <Label.Group>
              {vinyl.styles ? 
                vinyl.styles.map((style, index) => <Label color='teal' size={"small"} key={index}>{style}</Label>)
                :
                null
              }
              </Label.Group>
              <div className='ui two buttons'>
              <Item.Extra>
                {
                  inCollection ? 
                    <Button 
                      floated='right'
                      basic color='green'
                      onClick={() => removeFromCollection()}     
                    >
                      Remove from Collection
                    </Button>
                  :
                  <Button 
                  floated='right' 
                  basic color='green'
                  onClick={() => addToCollection({ collection_id: 1, album_id: id })}
                  >Add To Collection</Button>

                }
                 
                {
                inWantList ? 
                  <Button 
                  floated='right'
                  basic color='orange'
                  onClick={() => removeFromWantlist()} 
                  >Remove from Wantlist</Button>  
                     :
                  <Button 
                  floated='right'
                  basic color='orange'
                  onClick={() => addToWantlist({ wantlist_id: 1, album_id: id})} 
                  >Add To Wantlist</Button> } 
              </Item.Extra>
                </div>
            </Item.Extra>
          </Item.Content>
        </Item>
    </>
  );
}

export default VariantListItem;
