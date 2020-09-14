import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Collection from './containers/Collection'
import Wantlist from './containers/Wantlist';
import Home from "./containers/Home";
import NavBar from './components/NavBar'
import LoginPage from './containers/LoginPage'
import UserProfile from './containers/UserProfile';
import ArtistProfile from './containers/ArtistProfile';
import ReleasePage from './containers/ReleasePage'
import NewUserPage from './containers/NewUserPage';
import Logout from './containers/Logout';

// const waxUrl = 'http://localhost:3000/api/v1'
const waxUrl = 'https://api.waxchromatics.com/api/v1'

class App extends Component {
  state = {
    username: '',  
    loggedIn: false,
    collection: [],
    wantlist: [],
  }

  componentDidMount() {
    this.checkLoggedIn()
    this.loadCollection()
    this.loadWantlist()
  }

  checkLoggedIn = () => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    if (!waxUser) {
      return
    } else {
      this.setState({username: waxUser.username})
      this.setState({loggedIn: true})
    }
  }
  
  loadCollection = () => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    if (waxUser) {
      fetch(`${waxUrl}/collections/${waxUser.id}`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${waxUser.token}`}})
        .then(response => response.json())
        .then(albums => this.setState({collection: albums}))
    }
  }

  loadWantlist = () => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    if (waxUser) {
      fetch(`${waxUrl}/wantlists/${waxUser.id}`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${waxUser.token}`}})
        .then(response => response.json())
        .then(albums => this.setState({wantlist: albums}))
    }
  }

  addVinylToCollection = (albumId) => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    fetch(`${waxUrl}/collection_albums/`, {
      method: 'POST',
      body: JSON.stringify({
        collection_id: waxUser.collection,
        album_id: albumId }),
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${waxUser.token}`}})
        .then(response => response.json())
        .then(addAlbum => {
          this.loadCollection()
        })
  }

  removeVinylFromCollection = (collectionAlbumId) => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    fetch(`${waxUrl}/collection_albums/${collectionAlbumId}`, {
      method: 'DELETE',
      headers: {Authorization: `Bearer ${waxUser.token}`}})
        .then(deletedAlbum => {
          this.loadCollection()
        })
  }

  addVinylToWantlist = (albumId) => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    fetch(`${waxUrl}/wantlist_albums/`, {
      method: 'POST',
      body: JSON.stringify({
        wantlist_id: waxUser.collection,
        album_id: albumId }),
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${waxUser.token}`}})
        .then(response => response.json())
        .then(addAlbum => {
          this.loadWantlist()
        })
  }

  removeVinylFromWantlist = (wantlistAlbumId) => {
    const waxUser = JSON.parse(localStorage.getItem("waxUser"))
    fetch(`${waxUrl}/wantlist_albums/${wantlistAlbumId}`, {
      method: 'DELETE',
      headers: {Authorization: `Bearer ${waxUser.token}`}})
        .then(deletedAlbum => {
          this.loadWantlist()
        })
  }

  updateUsername = (username) => {
    this.setState({username})
  }

  userLoggedIn = () => {
    this.setState({loggedIn: !this.state.loggedIn})
  }

  updateWantlist = (newWantlist) => {
    this.setState({wantlist: newWantlist})
  }

  // TODO at some point we need to redo how the components are ordered / loaded
  // initially was going to be a single page app but changed direction midway through so first couple of pages are rough
  // ex: the search results technically load on the first page but could easily be their own component
  render() {
    return (
      <>
      <NavBar 
        username={this.state.username} loggedIn={this.state.loggedIn}
      />
      <Switch>
        {/* <Route path="/pets/:id" component={PetProfile}/> */}
        <Route path="/collection" render={() => <Collection collection={this.state.collection}/>}/> 
        <Route path="/wantlist" render={() => <Wantlist wantlist={this.state.wantlist}/>}/>
        <Route path="/profile" render={() => <UserProfile username={this.state.username}/>}/>
        <Route path="/login" render={() => <LoginPage updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />}/>
        <Route path="/signup" render={() => <NewUserPage updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />}/>
        <Route path="/artist" render={() => <ArtistProfile collection={this.state.collection} wantlist={this.state.wantlist} />}/>
        {/* <Route path="/release" component={ReleasePage}/> */}
        <Route path="/release" render={() => <ReleasePage 
          collection={this.state.collection}
          wantlist={this.state.wantlist}
          addVinylToCollection={this.addVinylToCollection}
          removeVinylFromCollection={this.removeVinylFromCollection}
          addVinylToWantlist={this.addVinylToWantlist}
          removeVinylFromWantlist={this.removeVinylFromWantlist}
        />}/>
        <Route path="/logout" render={() => <Logout updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />}/>
        <Route path="/" render={() => <Home updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />}/>
      </Switch>

    </>
    );
  }
}
export default App;

