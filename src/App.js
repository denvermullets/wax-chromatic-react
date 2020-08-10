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
import Authenticate from './components/Authenticate';

class App extends Component {
  state = {
    discogs_id: '',
    username: '',
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
    console.log('App::updateUsername - should be upating username to ', username)
    this.setState({username})
  }

  render() {
    return (
      <>
      <NavBar 
        username={this.state.username}
      />
      <Switch>
        {/** in switch, make sure you go most specific to least and/or use exact  */}
        {/** Router props => auto passed down in component notation */}
        {/* <Route path="/pets/:id" component={PetProfile}/> */}
        <Route path="/collection" component={Collection}/> 
        <Route path="/wantlist" component={Wantlist}/>
        {/* <Route path="/profile" component={UserProfile}/> */}
        {/* <Route path="/profile" render={() => <UserProfile username={this.state.username} updateUserInfo={this.updateUserInfo}/>}/> */}
        <Route path="/profile" render={() => <UserProfile username={this.state.username} updateUsername={this.updateUsername}/>}/>
        <Route path="/login" component={LoginPage}/>
        {/* <Route path="/authenticate" component={Authenticate}/> */}
        <Route path="/artist" component={ArtistProfile}/>
        <Route path="/release" component={ReleasePage}/>
        {/* <Route path="/help" render={(routerProps) => <Help urgency={5} {...routerProps}/>}/> */}
        <Route path="/" component={Home}/>
      </Switch>

    </>
    );
  }
}
export default App;

