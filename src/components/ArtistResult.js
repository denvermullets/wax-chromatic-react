import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class ArtistResult extends Component {

  addDefaultSrc(ev){
    ev.target.src = 'https://freesvg.org/img/1536281106.png'
  }

  render() {
    const { cover_image, title } = this.props.artist
    return (
      <>
        <Card>
          <img src={cover_image} onError={this.addDefaultSrc} height={275} alt={title} />
          {/* <Image src={cover_image} square={true} wrapped ui={false}  /> */}
          <Card.Content>
            <Card.Header>{title}</Card.Header>
          </Card.Content>
          <Card.Content extra>
          <Link to={{
            pathname: `/artist`,
            search: `q=${title}`,
            state: { artist: this.props.artist }
          }}>
            <Icon name='headphones' />
              Select Artist
          </Link>
          </Card.Content>
        </Card>
      </>
    );
  }
}

export default ArtistResult;
