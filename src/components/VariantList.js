import React, { useState, useEffect } from 'react';
import { Item } from 'semantic-ui-react'
import VariantListItem from './VariantListItem';


const waxUrl = 'http://localhost:3000/api/v1'

const VariantList = (props) => {

  const [ collection, setCollection ] = useState([])
  const [ wantList, setWantlist ] = useState([])
  const [ count, setCount ] = useState(0)

  const checkCollectionlist = () => {
    console.log('update collection?')
    fetch(`${waxUrl}/collection_albums`)
      .then(response => response.json())
      .then(collection => setCollection(collection))
  }

  const checkWantlist = () => {
    console.log('updating wantlist?')
    fetch(`${waxUrl}/wantlist_albums`)
      .then(response => response.json())
      .then(wantList => setWantlist(wantList))
  }

  const updateCount = () => {
    setCount(prevCount => prevCount - 1)
  }

  useEffect(() => {
    // checkCollectionlist()
    console.log('update collection?')
    fetch(`${waxUrl}/collection_albums`)
      .then(response => response.json())
      .then(collection => setCollection(collection))
  }, [count]);
  
  useEffect(() => {
    // checkWantlist()
    fetch(`${waxUrl}/wantlist_albums`)
      .then(response => response.json())
      .then(wantList => setWantlist(wantList))
  }, [count]);



  return (
    <>
      <Item.Group divided style={{marginTop: '5em'}}>
        {props.variants ? props.variants.map(vinyl => 
          <VariantListItem 
            vinyl={vinyl}
            key={vinyl.id}
            collection={collection}
            wantlist={wantList}
            checkWantlist={checkWantlist}
            checkCollectionlist={checkCollectionlist}
            updateCount={updateCount}
          />  )
          
          : null}

      </Item.Group>
    </>
  );
}

export default VariantList;
