import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';
import ArtistResult from '../components/ArtistResult';
import { Card } from 'semantic-ui-react';

class Home extends Component {

  state = {
    searchArtists: [],
  }


  setArtists = (searchResults) => {
    this.setState({ searchArtists: searchResults.results})
  }

  render() {
    // let searchArtistsCount = this.state.searchArtists.count
    return (
      <>
        <SearchBar
          setArtists={this.setArtists} 
        />
        <Card.Group>
          {this.state.searchArtists.map(artist => {
            return <ArtistResult
            artist={artist}
            key={artist.id}
            />
          })}
        </Card.Group>
      </>
    );
  }
}

export default Home;
