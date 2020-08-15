import React from 'react';
import { Table, Button } from 'semantic-ui-react'

const CollectionItem = (props) => {
  
  // const { released, title, cat_no, notes, artist} = props.vinyl
  const { released, title, cat_no, notes } = props.vinyl.album
  const { artist } = props.vinyl.album.release
  return (
    <>
      <Table.Row>
        <Table.Cell>{released}</Table.Cell>
        <Table.Cell>{artist}</Table.Cell>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell>{cat_no}</Table.Cell>
        <Table.Cell>{notes}</Table.Cell>
        <Table.Cell><Button size="mini" basic color='yellow'>Remove</Button></Table.Cell>
      </Table.Row>
    </>
  );
}

export default CollectionItem;
