import React from "react"
import { Table } from "semantic-ui-react"

const TrackListItem = (props) => {
  return (
    <>
      <Table.Row>
        <Table.Cell>{props.track.title}</Table.Cell>
        <Table.Cell>{props.track.duration}</Table.Cell>
      </Table.Row>
    </>
  )
}

export default TrackListItem
