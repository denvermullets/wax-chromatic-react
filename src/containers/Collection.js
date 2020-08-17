import React, { Component } from 'react';
import CollectionList from '../components/CollectionList';
import { Container, Header } from 'semantic-ui-react';

class Collection extends Component {
  
  render() {
    return (
      <>
      <Container>
        <Header as={'h1'}>
          My Collection
        </Header>
        <CollectionList 
          vinyls={this.props.collection}
          />
      </Container>
    </>
    );
  }
}

export default Collection;