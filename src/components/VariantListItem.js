import React, { useEffect, useState } from 'react';
import { Item, Label, Button} from 'semantic-ui-react'

const url = 'https://api.discogs.com'
// const waxUrl = 'http://localhost:3000/api/v1'
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
  const { thumb, title, cat_no, released, d_album_id, notes } = props.vinyl
  const [ vinylExtraInfo, setVinylExtraInfo ] = useState([])

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://freesvg.org/img/1536281106.png'
  }

  useEffect(() => {
    // TODO need to move this to backend to save info to reduce api calls to discogs
    fetch(`${url}/releases/${d_album_id}`, requestOptions)
      .then(response => response.json())
      .then(vinyl => setVinylExtraInfo(vinyl))
  }, [d_album_id]);

  let collection = props.collection.filter(collectionAlbum => parseInt(collectionAlbum.album.d_album_id) === parseInt(props.vinyl.d_album_id))
  let wantlist = props.wantlist.filter(wantlistAlbum => parseInt(wantlistAlbum.album.d_album_id) === parseInt(props.vinyl.d_album_id))
  

  // addVinylToWishlist={this.addVinylToWishlist} 
  // removeVinylFromWishlist={this.removeVinylFromWishlist}
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
              {vinylExtraInfo.notes_plaintext}
            </Item.Description>
            <Item.Extra>
              <Label.Group>
              {vinylExtraInfo.styles ? 
                vinylExtraInfo.styles.map((style, index) => <Label color='teal' size={"small"} key={index}>{style}</Label>)
                :
                null
              }
              </Label.Group>
              <div className='ui four buttons'>
              <Item.Extra>
                
                {
                  collection.length > 0 ? 
                    <Button 
                      floated='right'
                      basic color='red'
                      onClick={ () => props.removeVinylFromCollection(collection[0].id) }
                    >
                      Remove from Collection
                    </Button>
                  :
                    null
                }
                <Button 
                  floated='right' 
                  basic color='green'
                  onClick={ () => props.addVinylToCollection(props.vinyl.id) }
                  >Add To Collection
                </Button>
               
                {
                wantlist.length > 0 ? 
                  <Button 
                  floated='right'
                  basic color='red'
                  onClick={ () => props.removeVinylFromWantlist(wantlist[0].id) } 
                  >Remove from Wantlist</Button>  
                     :
                  null } 
                <Button 
                  floated='right'
                  basic color='orange'
                  onClick={ () => props.addVinylToWantlist(props.vinyl.id) } 
                  >Add To Wantlist
                </Button>
              </Item.Extra>
                </div>
            </Item.Extra>
          </Item.Content>
        </Item>
    </>
  );
}

export default VariantListItem;
