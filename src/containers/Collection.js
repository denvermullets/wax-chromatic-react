import React, { Component } from 'react';
import CollectionList from '../components/CollectionList';
import { Container, Header } from 'semantic-ui-react';

const waxUrl = 'http://localhost:3000/api/v1'

class Collection extends Component {
  state = {
    collection: [],
    vinylAlbums: [],
  }

  loadCollection = () => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    fetch(`${waxUrl}/collections/${waxUser.id}`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${waxUser.token}`}})
        .then(response => response.json())
        .then(albums => this.setState({collection: albums}))
  }

  componentDidMount() {
    // this.getCollection()
    this.loadCollection()
  }

  render() {
    return (
      <>
      <Container>
        <Header as={'h1'}>
          My Collection
        </Header>
        <CollectionList 
          vinyls={this.state.vinylAlbums}
          />
      </Container>
    </>
    );
  }
}

export default Collection;