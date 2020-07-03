import React, { useState, useEffect, useRef } from 'react';
import ArtistBio from '../components/ArtistBio';
import AlbumGrid from '../components/AlbumGrid';

const url = 'https://api.discogs.com'
const waxUrl = 'http://localhost:3000/api/v1'
const discogsKey = `key=${process.env.REACT_APP_DISCOGS_KEY},`
const discogsSecret = `secret=${process.env.REACT_APP_DISCOGS_SECRET}`
const discogsHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Discogs ${discogsKey} ${discogsSecret}`,
  "User-Agent": "WaxChromatics/v0.1 +https://localhost:3001/login",
}

const requestOptions = {
  method: 'GET',
  headers: discogsHeaders,
}

const ArtistProfile = (props) => {
  const artistId = props.location.state.artist.id // from router push

  const [ count, setCount ] = useState(0)
  const [ artistInfo, setArtistInfo ] = useState()
  const [ releases, setReleases ] = useState()
  const [ vinyls, setVinyls ] = useState()

  const checkArtist = () => {
    // get artist information
    console.log('checking for artist ', artistId)
    fetch(`${waxUrl}/artists/${artistId}`)
      .then(response => response.json())
      .then(artistInfo => setArtistInfo(artistInfo))
  }

  const getArtistReleases = () => {
    // get first page of artist releases and then filter out non parent (master) releases
    fetch(`${url}/artists/${artistId}/releases?sort=year&sort_order=desc&page=1&per_page=100`, requestOptions)
      .then(response => response.json())
      .then(artistReleases => {
        let releases = artistReleases.releases
        releases = releases.filter(release => release.type === 'master')
        setReleases(releases)
        /// need to rate limit this     
        // releases.map(vinyl => getVinylAlbums(vinyl.id))
      })
      .catch(error => console.log('error', error));
  }

  // const getVinylAlbums = (releaseId) => {
  //   console.log('calling on releaseId', releaseId)
  //   const date = new Date()
  //   var time = date.toLocaleTimeString()
  //   console.log(time)

  //   fetch(`${url}/masters/${releaseId}/versions?page=1&per_page=100`, requestOptions)
  //     .then(response => response.json())
  //     .then(releaseInfo => {
  //       let vinyls = releaseInfo.versions
  //       console.log(`all ${vinyls[0].title} variants`, vinyls)
  //       vinyls = vinyls.filter(vinyl => vinyl.major_formats.includes('Vinyl'))
  //       // vinyls.map(vinyl => setVinyls({ vinyls: [...vinyls, vinyl]}))
  //       vinyls.map(vinyl => setVinyls([...vinyls, vinyl]))
  //     })
  //     .catch(error => console.log('vinyl hunt', error))
  // }

  useEffect(() => {
    checkArtist()
  }, [])

  useEffect(() => {
    getArtistReleases()
  }, [artistInfo]);

  

  useEffect(() => {
    function getVinylAlbums(releaseId) {
      console.log('calling on releaseId', releaseId)
      const date = new Date()
      var time = date.toLocaleTimeString()
      console.log(time)
  
      fetch(`${url}/masters/${releaseId}/versions?page=1&per_page=100`, requestOptions)
        .then(response => response.json())
        .then(releaseInfo => {
          let vinyls = releaseInfo.versions
          console.log(`all ${vinyls[0].title} variants`, vinyls)
          vinyls = vinyls.filter(vinyl => vinyl.major_formats.includes('Vinyl'))
          // vinyls.map(vinyl => setVinyls({ vinyls: [...vinyls, vinyl]}))
          vinyls.map(vinyl => setVinyls([...vinyls, vinyl]))
          // setCount( count + 1)

        })
        .catch(error => console.log('vinyl hunt', error))
    }

      // if (releases) {
      //   const interval = setInterval(() => getVinylAlbums(releases[count].id), 500)
      // }
      
      
      console.log('count of fetches', count)
      console.log('release check', releases)

    return () => {
      // clearInterval(interval)
    };
  }, [releases]);

  return (
    
    <>
      <ArtistBio 
        name={artistInfo ? artistInfo.name : null}
        profile={artistInfo ? artistInfo.bio : null}
      />

      <AlbumGrid 
        vinyls={vinyls ? vinyls : null}
        artistInfo={artistInfo ? artistInfo : null}
      /> 
    </>
  );
}

export default ArtistProfile;
