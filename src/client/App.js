//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// In case we use forms later: 
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import Button from "react-bootstrap/Button";

import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import './App.css';

//Components
import Navigation from './components/Navigation';
import Overview from './components/Overview';
import Login from './components/Login';
import Account from './components/Account';
import Signup from './components/Signup';
import Settings from './components/Settings';
import Authenticate from './components/Authenticate';
import RoomsAndMeters from './components/RoomsAndMeters';
import Today from './components/Today';
import Week from './components/Week';
import Facts from './components/Facts';
//Stretch:
//Logout.Component
//Error.Component


class App extends React.Component {
  render(){
    return (
      <div className="App">
        <HashRouter >
          <header className="App-header">
            <Navigation />
          </header>
          <Switch>
            <Route path="/" exact component={Authenticate}></Route>
            <Route path="/home" component={Overview}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/account" component={Account}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/settings" component={Settings}></Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
