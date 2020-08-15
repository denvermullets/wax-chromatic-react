import React, { Component } from 'react';
import WantlistList from '../components/WantlistList';
import { Container, Header } from 'semantic-ui-react';

const waxUrl = 'http://localhost:3000/api/v1'

class Wantlist extends Component {
  loadWantlist = () => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    fetch(`${waxUrl}/wantlists/${waxUser.id}`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${waxUser.token}`}})
        .then(response => response.json())
        .then(albums => this.props.updateWantlist(albums))
  }

  componentDidMount() {
    this.loadWantlist()
  }

  render() {
    return (
      <>
      <Container>
        <Header as={'h1'}>
          My Wantlist
        </Header>
        <WantlistList 
          vinyls={this.props.wantlist}
        />
      </Container>
    </>
    );
  }
}

export default Wantlist;
