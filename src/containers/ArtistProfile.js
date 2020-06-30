import React, { Component } from 'react';
import _ from 'lodash'
import ArtistBio from '../components/ArtistBio';
import AlbumGrid from '../components/AlbumGrid';

const discogsKey = `key=${process.env.REACT_APP_DISCOGS_KEY},`
const discogsSecret = `secret=${process.env.REACT_APP_DISCOGS_SECRET}`
const discogsHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Discogs ${discogsKey} ${discogsSecret}`,
  "User-Agent": "WaxChromatics/v0.1 +https://localhost:3001/login",
  // 'Access-Control-Allow-Origin': '*'
}

const requestOptions = {
  method: 'GET',
  headers: discogsHeaders,
}

const url = 'https://api.discogs.com'


class ArtistProfile extends Component {

  state = {
    artistInfo: [],
    releases: [],
    vinyls: [],
  }

  componentDidMount() {
    this.getArtistInfo()
    this.getArtistReleases()
  }

  getArtistInfo = () => {
    fetch(`${url}/artists/${this.props.location.state.artist.id}`, requestOptions)
      .then(response => response.json())
      // .then(result => console.log(result))
      .then(artistInfo => this.setState({ artistInfo }))
      .catch(error => console.log('error', error));
  }

  getArtistReleases = () => {
    fetch(`${url}/artists/${this.props.location.state.artist.id}/releases?sort=year&sort_order=desc&page=1&per_page=100`, requestOptions)
      .then(response => response.json())
      // .then(result => console.log(result))
      .then(artistReleases => {
        let releases = artistReleases.releases
        releases = releases.filter(release => release.type === 'master')
        this.setState({ releases })
        
        
        releases.map(vinyl => this.getVinylAlbums(vinyl.id))
        
        

      })
      .catch(error => console.log('error', error));
  }

  getVinylAlbums = (releaseId) => {
    console.log('calling on releaseId', releaseId)
    fetch(`${url}/masters/${releaseId}/versions?page=1&per_page=100?callback=JSON_CALLBACK`, requestOptions)
      .then(response => response.json())
      .then(releaseInfo => {
        let vinyls = releaseInfo.versions
        console.log('all release variants',vinyls)
        vinyls = vinyls.filter(vinyl => vinyl.major_formats.includes('Vinyl'))
        vinyls.map(vinyl => this.setState({ vinyls: [...this.state.vinyls, vinyl]}))
      })
      .catch(error => console.log('vinyl hunt', error))
  }


  render() {
    const { name, profile } = this.state.artistInfo
    return (
      <>
        <ArtistBio 
          name={name}
          profile={profile}
        />

        <AlbumGrid 
          vinyls={this.state.vinyls}
          artistInfo={this.state.artistInfo}
        />
      </>
    );
  }
}

export default ArtistProfile;
