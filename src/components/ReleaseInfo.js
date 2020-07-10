import React from 'react';
import { Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const ReleaseInfo = (props) => {

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://freesvg.org/img/1536281106.png'
  }
  const { year, thumb, title, id } = props.release
  return (
    <Card style={{width: 250}}>
    {/* <Image size="mini" src={thumb ? thumb : 'https://freesvg.org/img/1536281106.png'} onError={addDefaultSrc} wrapped ui={false} /> */}
    <img src={thumb ? thumb : 'https://freesvg.org/img/1536281106.png'} onError={addDefaultSrc} height={250} width={250} alt={title} />
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>
        <span className='date'>{year}</span>
      </Card.Meta>
      <Card.Description>
        
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Link to={{
        pathname: `/release`,
        search: `q=${title}`,
        state: { release: id, artist: props.artistInfo.id }
      }}>
        <Icon name='headphones' />
          Select Release
      </Link>
    </Card.Content>
  </Card>
  );
}

export default ReleaseInfo;
