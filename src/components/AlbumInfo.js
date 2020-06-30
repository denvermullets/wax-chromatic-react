import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

const AlbumInfo = (props) => {

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://freesvg.org/img/1536281106.png'
  }

  // const { title } = props.artistInfo
  const { format, label, released, thumb, title } = props.vinyls
  return (
    <>
      <Card>
        <img src={thumb} onError={addDefaultSrc} height={275} alt={title} />
        {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span className='date'>{released}</span>
          </Card.Meta>
          <Card.Description>
            {label}
            {format}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='headphones' />
            Add to Collection
          </a>
        </Card.Content>
      </Card>
    </>
  );
}

export default AlbumInfo;
