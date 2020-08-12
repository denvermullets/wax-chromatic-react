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

class App extends Component {
  state = {
    username: '',  
    loggedIn: false,
  }

  componentDidMount() {
    this.updateUserInfo()
  }

  updateUserInfo = () => {
    console.log('App::updateUserInfo - should be updating state of username')
    const waxChromatics = JSON.parse(localStorage.getItem("waxChromatics" || "{}"))
    
    if (!waxChromatics) {
      return
    } else {
      this.setState({discogs_id: waxChromatics.discogs_id})
      this.setState({username: waxChromatics.name})
    }
  }

  updateUsername = (username) => {
    this.setState({username})
  }

  userLoggedIn = () => {
    this.setState({loggedIn: !this.state.loggedIn})
  }

  render() {
    return (
      <>
      <NavBar 
        username={this.state.username} loggedIn={this.state.loggedIn}
      />
      <Switch>
        {/* <Route path="/pets/:id" component={PetProfile}/> */}
        <Route path="/collection" component={Collection}/> 
        <Route path="/wantlist" component={Wantlist}/>
        <Route path="/profile" render={() => <UserProfile username={this.state.username}/>}/>
        <Route path="/login" render={() => <LoginPage updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />}/>
        <Route path="/signup" render={() => <NewUserPage updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />}/>
        <Route path="/artist" component={ArtistProfile}/>
        <Route path="/release" component={ReleasePage}/>
        <Route path="/logout" render={() => <Logout updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />}/>
        <Route path="/" render={() => <Home updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />}/>
      </Switch>

    </>
    );
  }
}
export default App;

