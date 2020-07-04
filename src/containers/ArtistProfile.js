import React, { useState, useEffect, useRef } from 'react';
import { throttle } from 'throttle-debounce';
import throttledQueue from 'throttled-queue'
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

  const [ releasesLoaded, setReleasesLoaded ] = useState(false)
  const [ artistInfo, setArtistInfo ] = useState()
  const [ releases, setReleases ] = useState()
  const [ vinyls, setVinyls ] = useState([])

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
        let foundReleases = artistReleases.releases
        foundReleases = foundReleases.filter(singleRelease => singleRelease.type === 'master' && singleRelease.role === 'Main')
        setReleases(foundReleases)
      })
      .then(setReleasesLoaded(true))
      .catch(error => console.log('error', error));
  }

  const getVinylAlbums = (releaseId) => {
    console.log('calling on releaseId', releaseId)
    fetch(`${url}/masters/${releaseId}/versions?page=1&per_page=100`, requestOptions)
      .then(response => response.json())
      .then(releaseInfo => {
        let findVinyls = releaseInfo.versions
        console.log(`all ${findVinyls[0].title} variants`, findVinyls)
        findVinyls = findVinyls.filter(vinyl => vinyl.major_formats.includes('Vinyl'))
        findVinyls.map(vinyl => setVinyls(vinyls => [...vinyls, vinyl]))        
    })
    .catch(error => console.log('getVinylAlbums oopsie whatsie', error))
  }

  const checkWaxRecords = (releaseId) => {
    fetch(`${waxUrl}/albums/${releaseId}`)
      .then(response => response.json())
      .then(console.log('checked waxChromatics id: ', releaseId))
      // .then(artistInfo => setArtistInfo(artistInfo))
  }

  useEffect(() => {
    checkArtist()
    getArtistReleases()
  }, [])


  useEffect(() => {
    if (releasesLoaded){
      loadVinyl()
    }
  }, [releases])

const loadVinyl = () => {
  console.log('starting que?')
  // let's check internal API first to see if info exists



    getVinylAlbums(releases[0].id) // start loading 1 album ASAP before 1 second counter starts
  const throttle = throttledQueue(1, 1000); // at most make 1 request every second.
  for (let x = 1; x < releases.length; x++) {
    throttle(function() {
        // make a network request.
        getVinylAlbums(releases[x].id)
    });
  }
}

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

      {/* {useGetVinyls()} */}
    </>
  );
}

export default ArtistProfile;
