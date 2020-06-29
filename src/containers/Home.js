import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';
import ArtistResult from '../components/ArtistResult';
import { Card } from 'semantic-ui-react';
// import ArtistProfile from './ArtistProfile';

class Home extends Component {

  state = {
    searchArtists: [],
    selectedArtist: ''
  }


  setArtists = (searchResults) => {
    this.setState({ searchArtists: searchResults.results})
  }

  selectedArtist = (artist) => {
    this.setState({ selectedArtist: artist })
    this.setState({ searchArtists: [] })
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
            selectedArtist={this.selectedArtist}
            key={artist.id}
            />
          })}
        </Card.Group>
        {/* <ArtistProfile
          selectedArtist={this.state.selectedArtist}
        /> */}
      </>
    );
  }
}

export default Home;
