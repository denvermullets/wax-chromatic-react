import React, { Component } from 'react';
import CollectionList from '../components/CollectionList';
import { Container, Header } from 'semantic-ui-react';

const waxUrl = 'http://localhost:3000/api/v1'

class Collection extends Component {
  state = {
    collectionAlbums: [],
    vinylAlbums: [],
  }

  getCollection = () => {
    console.log('loading collection')
    fetch(`${waxUrl}/collection_albums/`)
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



// const [ collectionAlbums, setCollectionAlbums ] = useState([])
// const [ vinylAlbums, setVinylAlbums ] = useState([])

// const getCollection = () => {
//   console.log('loading collection')
//   fetch(`${waxUrl}/collection_albums/`)
//     .then(response => response.json())
//     .then(albums => setCollectionAlbums(albums))
//     .catch(error => console.log('error getting collection', error))
// }

// const loadVinyls = () => {
//   console.log('iterating thru collection')
//   const throttle = throttledQueue(1, 200) // make 1 call every 50ms
//   collectionAlbums.map(vinyl => 
//     throttle(() => {
//       getVinyl(vinyl.album_id)
//     })
//   )
// }

// const getVinyl = (album) => {
//   console.log('loading record ', album)
//       fetch(`${waxUrl}/albums/vinyl/${album}`)
//         .then(response => response.json())
//         // .then(album => setVinylAlbums([...vinylAlbums, album]))
//         // .then(pulledAlbum => console.log('this is what loaded? ', pulledAlbum))
//         .then(pulledAlbum => setVinylAlbums([...vinylAlbums, pulledAlbum]))
//         .catch(error => console.log(`error loading album ${album}`, error))
// }

// useEffect(() => {
//   getCollection()
// }, []);

// useEffect(() => {
//   loadVinyls()
// }, [collectionAlbums]);