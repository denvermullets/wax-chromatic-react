import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react'

const waxUrl = 'http://localhost:3000/api/v1'

const CollectionItem = (props) => {
  const dRelease = props.vinyl.d_release_id
  const [ artist, setArtist ] = useState()

  const getArtist = () => {
    console.log(dRelease)
    fetch(`${waxUrl}/releases/d_release_id/${dRelease}`)
      .then(response => response.json())
      .then(release => setArtist(release.artist))
  }

  useEffect(() => {
    getArtist()
  }, []);

  const { released, title, cat_no, notes} = props.vinyl
  return (
    <>
      <Table.Row>
        <Table.Cell>{released}</Table.Cell>
        <Table.Cell>{artist}</Table.Cell>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell>{cat_no}</Table.Cell>
        <Table.Cell>{notes}</Table.Cell>
      </Table.Row>
    </>
  );
}

export default CollectionItem;
