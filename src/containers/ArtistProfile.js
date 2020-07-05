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
  // "Accept": "application/vnd.discogs.v2.plaintext+json"
}

const requestOptions = {
  method: 'GET',
  headers: discogsHeaders,
}

const ArtistProfile = (props) => {
  const artistId = props.location.state.artist.id // from router push

  const [ artistInfoLoaded, setArtistInfoLoaded ] = useState(false)
  const [ artistInfo, setArtistInfo ] = useState()
  const [ releasesLoaded, setReleasesLoaded ] = useState(false)
  const [ releases, setReleases ] = useState()
  const [ waxReleasesLoaded, setWaxReleasesLoaded ] = useState(false)
  const [ waxReleases, setWaxReleases ] = useState()
  const [ vinyls, setVinyls ] = useState([])

  const checkArtist = () => {
    // get artist information
    console.log('checking for artist ', artistId)
    fetch(`${waxUrl}/artists/${artistId}`)
      .then(response => response.json())
      .then(artistInfo => setArtistInfo(artistInfo))
      .then(setArtistInfoLoaded(true))
  }

  const getArtistReleases = () => {
    // get first page of artist releases and then filter out non parent (master) releases and only albums that are mainly by artist (no collabs cur)
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

  const getParentReleases = () => {
    // get artist releases from WaxDB to compare and see if new albums exist
    fetch(`${waxUrl}/releases/${artistId}`)
      .then(response => response.json())
      .then(artistReleases => setWaxReleases(artistReleases))
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
        // map thru array of vinyls from selected release
        findVinyls.map(vinyl => setVinyls(vinyls => [...vinyls, vinyl]))

           
    })
    .catch(error => console.log('getVinylAlbums oopsie whatsie', error))
  }

  const checkWaxRecords = (releaseId) => {
    fetch(``)
      .then(response => response.json())
      .then(console.log('checked waxChromatics id: ', releaseId))
      
      // .then(artistInfo => setArtistInfo(artistInfo))
  }

const loadVinyl = () => {
  console.log('starting que?')
  // getVinylAlbums(releases[0].id) // start loading 1 album ASAP before 1 second counter starts
  const throttle = throttledQueue(1, 1500); // at most make 1 request every second.
  for (let x = 0; x < releases.length; x++) {
    throttle(function() {
      // make a network request.
      getVinylAlbums(releases[x].id)
    });
  }
}

const compareLists = () => {
  if (releases.length > waxReleases.length) {
    return true
  } else {
    return false
  }
}

 //// discogs api limits to 60 calls per second and the api endpoints don't have all the information i'd like
 //// it ends up taking like 160~ calls to display like 10 albums, it's kinda nutty
    // flow is:
      // get artist bio (first checks WaxDB then hits Discogs if no bio exists)
      // get artist releases (currently just 'masters') from discogs (also contains temp album image url)
      // get artist releases from WaxDB and then compare to see if new album parent ('master') exists
        // currently unable to see if there is a new repress w/o digging thru each actual release, could implement user button to check for updates
        // if new vinyls => get vinyl information and update db
      // pull up each 'master' release which contains info on all variants and filter out non vinyls
      // load all vinyls into 'vinyls'

  useEffect(() => {
    checkArtist()
    // discogs is so finicky with their api and sometimes i get a 429 response for, what i assume is, too many req coming from
    // my frontend and backend at the same time. hilarious considering backend only makes 1 req, but w/e
    if (artistInfoLoaded) {
      getArtistReleases() // get list of releases from discogs
      // getParentReleases() // get list of releases from WaxChromatics to compare
    }
  }, [artistInfoLoaded])

  useEffect(() => {
    if (releasesLoaded){
      loadVinyl()
    }
  }, [releases])

  // once discogs release list and WaxDb list is compiled, compare to see if we need to cycle thru
  // useEffect(() => {
  //   if(releasesLoaded && waxReleasesLoaded) {

  //   }
  // }, releasesLoaded, waxReleasesLoaded)


  let sortedVinyls = vinyls.sort((a,b) => { return a.released < b.released ? -1 : 1 })
  return (
    <>
      <ArtistBio 
        name={artistInfo ? artistInfo.name : null}
        profile={artistInfo ? artistInfo.bio : null}
      />

      <AlbumGrid 
        // vinyls={vinyls ? vinyls : null}
        vinyls={sortedVinyls ? sortedVinyls : null}
        artistInfo={artistInfo ? artistInfo : null}
      /> 

    </>
  );
}

export default ArtistProfile;
