import React from 'react';
import { Table } from 'semantic-ui-react'
import WantlistItem from './WantlistItem';


const WantlistList = (props) => {
  let sortedVinyls = props.vinyls.sort((a,b) => { return a.artist < b.artist ? -1 : 1 })
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
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            // props.vinyls.map(vinyl => <WantlistItem vinyl={vinyl} key={vinyl.id} />)
            sortedVinyls.map((vinyl, index) => <WantlistItem vinyl={vinyl} key={index} />)
          }
        </Table.Body>
      </Table>
    </>
  );
}

export default WantlistList;
