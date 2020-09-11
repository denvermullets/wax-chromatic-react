import React, { useState, useEffect } from 'react';
import throttledQueue from 'throttled-queue'
import ArtistBio from '../components/ArtistBio';
import AlbumGrid from '../components/AlbumGrid';

const url = 'https://api.discogs.com'
const waxUrl = 'http://localhost:3000/api/v1'
const discogsKey = `key=${process.env.REACT_APP_},`
const discogsSecret = `secret=${process.env.REACT_APP_DISCOGS_SECRET}`

const requestOptions = {
  method: 'GET',
  headers: new Headers({
    "User-Agent": "WaxChromatics/v0.1 +https://waxchromatics.com",
    "Accept": "application/vnd.discogs.v2.plaintext+json",
    "Content-Type": "application/json",
    "Authorization": `Discogs ${discogsKey} ${discogsSecret}`,
  })
}

const ArtistProfile = (props) => {
  const artistId = props.location.state.artist.id // from router push

  const [ loading, setLoading ] = useState(false)
  const [ artistInfoLoaded, setArtistInfoLoaded ] = useState(false)
  const [ artistInfo, setArtistInfo ] = useState()
  const [ releasesLoaded, setReleasesLoaded ] = useState(false)
  const [ releases, setReleases ] = useState()  // 'masters' from discogs api
  const [ waxReleasesLoaded, setWaxReleasesLoaded ] = useState(false)
  // const [ waxReleases, setWaxReleases ] = useState([])
  const [ vinyls, setVinyls ] = useState([])

  // const checkArtist = () => {
  //   // get artist information
  //   console.log('checking for artist ', artistId)
  //   fetch(`${waxUrl}/artists/${artistId}`)
  //     .then(response => response.json())
  //     .then(artistInfo => setArtistInfo(artistInfo))
  //     .then(setArtistInfoLoaded(true))
  //     // .then(setLoading(true))
  //     .catch(error => console.log('error getting artist ', error))
  // }

  const getArtistReleases = () => {
    // get first page of artist releases and then filter out non parent (master) releases and only albums that are mainly by artist (no collabs cur)
    console.log('loading artist releases', artistId)
    fetch(`${url}/artists/${artistId}/releases?sort=year&sort_order=desc&page=1&per_page=100`, requestOptions)
      .then(response => response.json())
      .then(artistReleases => {
        let foundReleases = artistReleases.releases
        foundReleases = foundReleases.filter(singleRelease => singleRelease.type === 'master' && singleRelease.role === 'Main')
        setReleases(foundReleases)
        // create release in WaxDb
        const throttle = throttledQueue(1, 500); // at most make 1 request every .5 seconds.
        foundReleases.map(singleRelease => 
          throttle(function() {
            // make a network request.
            createReleases(singleRelease)
          })
        )
      })
      .then(setReleasesLoaded(true))
      .catch(error => console.log('error', error));
  }

  const loadWaxReleases = () => {
    console.log('loading wax releases')
    fetch(`${waxUrl}/releases/${artistId}`)
      .then(response => response.json())
      .then(waxDbReleases => {
        if (waxDbReleases.length > 0) {
          // some releases exist, load up them vinyls
          setReleases(waxDbReleases)
          setWaxReleasesLoaded(true)
        } else {
          getArtistReleases()
        }
        
      })
      .catch(error => console.log('error', error));
  }

  const createReleases = (singleRelease) => {
    console.log('creating release: ', singleRelease.title)
    fetch(`${waxUrl}/releases/`, {
      method: 'POST',
      body: JSON.stringify({
        d_release_id: singleRelease.id,
        d_artist_id: artistId,
        artist: singleRelease.artist,
        title: singleRelease.title
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .catch(error => console.log('error', error));
  }

  const createWaxAlbums = (releaseId, vinylInfo) => {
    // singleRelease.id will be discogs release id, we use that to find the WaxDb release id
    console.log('looking up waxdb release ', releaseId)
    fetch(`${waxUrl}/releases/d_release_id/${releaseId}`)
      .then(response => response.json())
      .then(waxReleaseNum => { 
        console.log('creating vinyl in waxdb', releaseId)
        fetch(`${waxUrl}/albums/`, {
          method: 'POST',
          body: JSON.stringify({
            title: vinylInfo.title,
            released: vinylInfo.released,
            size: 12,
            amount_pressed: 100,
            color: 'black',
            notes: vinylInfo.format,
            cat_no: vinylInfo.catno,
            release_id: waxReleaseNum.id,
            thumb: vinylInfo.thumb,
            d_album_id: vinylInfo.id,
            // d_release_id: releaseId,
          }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
          .then(response => response.json())
          .then(vinyl => setVinyls(vinyls => [...vinyls, vinyl]))
          .catch(error => console.log('error during album creation ', error));

    })
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
        // findVinyls.map(vinyl => setVinyls(vinyls => [...vinyls, vinyl])) --------------------
        // since vinyl record isn't in our DB, let's toss it over to create
        const throttle = throttledQueue(1, 500); // at most make 1 request every .5 seconds.
        findVinyls.map(createVinyl => 
          throttle(function() {
            // make a network request.
            createWaxAlbums(releaseId, createVinyl)
          })
        )
    })
    .catch(error => console.log('getVinylAlbums oopsie whatsie', error))
  }

  const getWaxAlbums = (releaseId) => {
    console.log('calling on wax releaseId', releaseId)
    fetch(`${waxUrl}/albums/d_release_id/${releaseId}`)
      .then(response => response.json())
      .then(releaseInfo => {
        // map thru array of vinyls from selected release
        releaseInfo.map(vinyl => setVinyls(vinyls => [...vinyls, vinyl]))
    })
    .catch(error => console.log('getVinylAlbums oopsie whatsie', error))
  }

const loadVinyl = () => {
  console.log('starting que?')
  const throttle = throttledQueue(1, 2200); // at most make 2 request every seconds.
  for (let x = 0; x < releases.length; x++) {
    throttle(function() {
      // make a network request.
      getVinylAlbums(releases[x].id)
    });
    
    if (x === releases.length) {
      setLoading(false)
    }
  }
}

const loadWaxVinyl = () => {
  // means releases are in WaxDb, so let's pull info from our db on each release
  console.log('starting wax que')

  const throttle = throttledQueue(1, 500); // at most make 2 request every .2 seconds.
  for (let x = 0; x < releases.length; x++) {
    setLoading(true)
    throttle(function() {
      // make a network request.
      getWaxAlbums(releases[x].d_release_id)
    });
    
    if (x === releases.length) {
      setLoading(false)
    }
  }
}

 //// discogs api limits to 60 calls per second and the api endpoints don't have all the information i'd like
 //// if an artist has more cd releases than vinyl releases it can take a lot of calls to just get the vinyl results, it's kinda nutty
    // flow is:
      // get artist bio (first checks WaxDB then hits Discogs if no bio exists)
      // get artist releases (currently just 'masters') from discogs (also contains temp album image url)
      // pull up each 'master' release which contains info on all variants and filter out non vinyls
        // if artist releases are not in WaxDb, then they get created
      // get artist releases from WaxDB if found
        // currently unable to see if there is a new repress w/o digging thru each actual release, could implement user button to check for updates
        // if new vinyls => get vinyl information and update db
      // load all vinyls into 'vinyls'

  useEffect(() => {
    checkArtist()
    // discogs is so finicky with their api and sometimes i get a 429 response for, what i assume is, too many req coming from
    // my frontend and backend at the same time. hilarious considering backend only makes 1 req, but w/e
    if (artistInfoLoaded) {
      // getArtistReleases() // get list of releases from discogs
      loadWaxReleases() // get list of releases from WaxDb
      // getParentReleases() // get list of releases from WaxChromatics to compare
    }
  }, [artistInfoLoaded])

  useEffect(() => {
    if(waxReleasesLoaded){
      loadWaxVinyl()
    }
  }, [waxReleasesLoaded]);

  // once releases are loaded in state, get basic info and display
  useEffect(() => {
    if (releasesLoaded){
      loadVinyl()
    }
  }, [releases])



  let sortedVinyls = vinyls.sort((a,b) => { return a.released < b.released ? -1 : 1 })
  return (
    <>
        
      <ArtistBio 
        name={artistInfo ? artistInfo.name : null}
        profile={artistInfo ? artistInfo.bio : null}
        />

      

      <AlbumGrid centered={true}
        // vinyls={vinyls ? vinyls : null}
        vinyls={sortedVinyls ? sortedVinyls : null}
        artistInfo={artistInfo ? artistInfo : null}
        loading={loading}
        /> 

    </>
  );
}

export default ArtistProfile;