import React, { Component } from 'react';
// import throttledQueue from 'throttled-queue'
import WantlistList from '../components/WantlistList';


const waxUrl = 'http://localhost:3000/api/v1'

class Collection extends Component {
  state = {
    collectionAlbums: [],
    vinylAlbums: [],
  }

  getCollection = () => {
    console.log('loading collection')
    fetch(`${waxUrl}/wantlist_albums/`)
      .then(response => response.json())
      .then(albums => this.setState({collectionAlbums: albums}))
      .catch(error => console.log('error getting collection', error))
  }


  loadVinyls = () => {
    console.log('iterating thru collection')
    // const throttle = throttledQueue(1, 200) // make 1 call every 50ms
    this.state.collectionAlbums.map(vinyl => 
      // throttle(() => {
        this.getVinyl(vinyl.album_id)
      // })
    )
  }

  getVinyl = (album) => {
    console.log('loading record ', album)
      fetch(`${waxUrl}/albums/vinyl/${album}`)
        .then(response => response.json())
        // .then(album => setVinylAlbums([...vinylAlbums, album]))
        // .then(pulledAlbum => console.log('this is what loaded? ', pulledAlbum))
        .then(pulledAlbum => this.setState({vinylAlbums: [...this.state.vinylAlbums, pulledAlbum]}))
        .catch(error => console.log(`error loading album ${album}`, error))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.collectionAlbums !== this.state.collectionAlbums) {
      this.loadVinyls()
    }
  }

  componentDidMount() {
    this.getCollection()
  }

  

  render() {
    return (
      <>
      <WantlistList 
        vinyls={this.state.vinylAlbums}
        />
    </>
    );
  }
}

export default Collection;
