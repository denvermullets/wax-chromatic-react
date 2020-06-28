import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Collection from './containers/Collection'
import Wantlist from './containers/Wantlist';
import Home from "./containers/Home";
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <NavBar />
      <Switch> {/** in switch, make sure you go most specific to least and/or use exact  */}
        {/**
         * Router props => auto passed down in component notation 
         */}
        {/* <Route path="/pets/:id" component={PetProfile}/>  */}
        <Route path="/collection" component={Collection}/> 
        <Route path="/wantlist" component={Wantlist}/>
        {/* <Route path="/help" render={(routerProps) => <Help urgency={5} {...routerProps}/>}/> */}
        <Route path="/" component={Home}/>
      </Switch>

    </>
  );
}

export default App;
