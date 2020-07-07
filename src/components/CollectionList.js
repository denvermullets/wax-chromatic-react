import React from 'react';
import { Table } from 'semantic-ui-react'
import CollectionItem from './CollectionItem';


const CollectionList = (props) => {
  let sortedVinyls = props.vinyls.sort((a,b) => { return a.released < b.released ? -1 : 1 })
  return (
    <>
      <Table celled inverted selectable striped padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Released</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            <Table.HeaderCell>Album</Table.HeaderCell>
            <Table.HeaderCell>Cat No</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            // props.vinyls.map(vinyl => <CollectionItem vinyl={vinyl} key={vinyl.id} />)
            sortedVinyls.map(vinyl => <CollectionItem vinyl={vinyl} key={vinyl.id} />)
          }
        </Table.Body>
      </Table>
    </>
  );
}

export default CollectionList;
