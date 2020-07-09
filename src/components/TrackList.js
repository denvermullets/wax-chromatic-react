import React from 'react';
import { Table, Container, Grid, Image } from 'semantic-ui-react'
import TrackListItem from './TrackListItem'


const TrackList = (props) => {
  return (
    <>
      <Table basic='very' style={{marginTop: '3em'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { props.trackList ? props.trackList.map(track => <TrackListItem track={track} key={track.position}/>) : null }
        </Table.Body>
      </Table>
    </>
  );
}

export default TrackList;
