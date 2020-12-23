import React, { useState, useEffect } from "react"
import { Card, Icon, Label } from "semantic-ui-react"
import { Link } from "react-router-dom"

const ReleaseInfo = (props) => {
  let collection = props.collection.filter(
    (collectionAlbum) =>
      parseInt(collectionAlbum.album.release.d_release_id) ===
      parseInt(props.release.id)
  )
  let wantlist = props.wantlist.filter(
    (wantlistAlbum) =>
      parseInt(wantlistAlbum.album.release.d_release_id) ===
      parseInt(props.release.id)
  )

  const addDefaultSrc = (ev) => {
    ev.target.src = "https://freesvg.org/img/1536281106.png"
  }
  const { year, thumb, title, id } = props.release

  return (
    <Card style={{ width: 250 }}>
      <img
        src={thumb ? thumb : "https://freesvg.org/img/1536281106.png"}
        onError={addDefaultSrc}
        height={250}
        width={250}
        alt={title}
      />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className="date">{year}</span>
        </Card.Meta>
      </Card.Content>

      <Card.Content extra>
        <Link
          to={{
            pathname: `/release`,
            search: `q=${title}`,
            state: { release: id, artist: props.artistInfo.id },
          }}
        >
          <Icon name="headphones" />
          Select Release
        </Link>
        <Label.Group size="small">
          {/* display how many albums are in collection or wantlist for main release */}
          {collection.length > 0 ? (
            <Label color="green" image style={extraContent}>
              {collection.length}
              <Label.Detail>in Collection</Label.Detail>
            </Label>
          ) : null}
          {wantlist.length > 0 ? (
            <Label color="orange" image>
              {wantlist.length}
              <Label.Detail>in Wantlist</Label.Detail>
            </Label>
          ) : null}
        </Label.Group>
      </Card.Content>
    </Card>
  )
}

const extraContent = {
  marginTop: "5px",
  marginBottom: "5px",
}
export default ReleaseInfo
