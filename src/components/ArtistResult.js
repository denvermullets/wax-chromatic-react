import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class ArtistResult extends Component {
  render() {
    const { cover_image, title, thumb, id} = this.props.artist
    return (
      <>
        <Card>
          <img src={cover_image} height={300}/>
          {/* <Image src={cover_image} wrapped ui={false}  /> */}
          <Card.Content>
            <Card.Header>{title}</Card.Header>
          </Card.Content>
        </Card>
      </>
    );
  }
}

export default ArtistResult;
