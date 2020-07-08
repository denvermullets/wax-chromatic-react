import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';
import ArtistResult from '../components/ArtistResult';
import { Card, Container, Header, Button, Icon } from 'semantic-ui-react';
import LandingSearch from '../components/LandingSearch';

class Home extends Component {

  state = {
    searchArtists: [],
    selectedArtist: '',
    searched: false,
  }


  setArtists = (searchResults) => {
    this.setState({ searchArtists: searchResults.results})
  }

  selectedArtist = (artist) => {
    this.setState({ selectedArtist: artist })
    this.setState({ searchArtists: [] })
  }

  hideSearch = () => {
    this.setState({searched: !this.state.searched})
  }

  render() {

    return (
      <>
        {this.state.searched ? null : <LandingSearch 
          setArtists={this.setArtists}
          hideSearch={this.hideSearch}
        /> }


        <Card.Group>
          {this.state.searchArtists.map(artist => {
            return <ArtistResult
            artist={artist}
            selectedArtist={this.selectedArtist}
            key={artist.id}
            />
          })}
        </Card.Group>
      </>
    );
  }
}

export default Home;
