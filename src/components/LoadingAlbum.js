import React from 'react';
import { Card, Button, Placeholder } from 'semantic-ui-react'

const LoadingAlbum = () => {
  return (
    <>
      <Card key={'0001'}>      
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length='very short' />
                <Placeholder.Line length='medium' />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length='short' />
              </Placeholder.Paragraph>
            </Placeholder>
          
        </Card.Content>

        <Card.Content extra>
          <Button disabled={true} primary>
            Add
          </Button>
          <Button disabled={true}>Delete</Button>
        </Card.Content>
      </Card>
    </>
  );
}

export default LoadingAlbum;
