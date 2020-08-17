import React, { useState, useEffect } from 'react';
import { Item } from 'semantic-ui-react'
import VariantListItem from './VariantListItem';

const waxUrl = 'http://localhost:3000/api/v1'

const VariantList = (props) => {
  // const [ collection, setCollection ] = useState([])
  // const [ wantList, setWantlist ] = useState([])
  // const [ count, setCount ] = useState(0)

  // const checkCollectionlist = () => {
  //   console.log('update collection?')
  //   const waxUser = JSON.parse(localStorage.getItem("waxUser"))
  //   fetch(`${waxUrl}/collection_albums`, {
  //     method: 'GET',
  //     headers: {Authorization: `Bearer ${waxUser.token}`}})
  //       .then(response => response.json())
  //       .then(collection => setCollection(collection))
  // }

  // const checkWantlist = () => {
  //   console.log('updating wantlist?')
  //   const waxUser = JSON.parse(localStorage.getItem("waxUser"))
  //   fetch(`${waxUrl}/wantlist_albums`, {
  //     method: 'GET',
  //     headers: {Authorization: `Bearer ${waxUser.token}`}})
  //       .then(response => response.json())
  //       .then(wantList => setWantlist(wantList))
  // }

  // const updateCount = () => {
  //   setCount(prevCount => prevCount - 1)
  // }

  // useEffect(() => {
  //   // checkCollectionlist()
  //   console.log('update collection?')
  //   const waxUser = JSON.parse(localStorage.getItem("waxUser"))
  //   fetch(`${waxUrl}/collection_albums`, {
  //     method: 'GET',
  //     headers: {Authorization: `Bearer ${waxUser.token}`}})
  //       .then(response => response.json())
  //       .then(collection => setCollection(collection))
  // }, [count]);
  
  // useEffect(() => {
  //   // checkWantlist()
  //   const waxUser = JSON.parse(localStorage.getItem("waxUser"))
  //   fetch(`${waxUrl}/wantlist_albums`, {
  //     method: 'GET',
  //     headers: {Authorization: `Bearer ${waxUser.token}`}})
  //       .then(response => response.json())
  //       .then(wantList => setWantlist(wantList))
  // }, [count]);



  return (
    <>
      <Item.Group divided style={{marginTop: '5em'}}>
        {props.variants ? props.variants.map(vinyl => 
          <VariantListItem 
            vinyl={vinyl}
            key={vinyl.id}
            collection={props.collection}
            wantlist={props.wantlist}
            // checkWantlist={checkWantlist}
            // checkCollectionlist={checkCollectionlist}
            // updateCount={updateCount}
          />  )
          
          : null}

      </Item.Group>
    </>
  );
}

export default VariantList;
