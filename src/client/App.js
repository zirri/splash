//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App1.css';

//Components
import Navigation from './components/Navigation';
import Overview from './components/Overview';
import LoginFormik from './components/LoginFormik';
import Account from './components/Account';
import Signup from './components/Signup';
import Settings from './components/Settings';
import Authenticate from './components/Authenticate';
import RoomsAndMeters from './components/RoomsAndMeters';
import Facts from './components/Facts';
import withAuthentication from './higher-order-components/withAuthentication.js'
import Logout from './components/Logout'

class App extends React.Component {
  render(){
    const DefaultContainer = () => (
      <>
        <Navigation />
        <Route path="/home" component={withAuthentication(Overview)}></Route>
        <Route path="/account" component={withAuthentication(Account)}></Route>
        <Route path="/settings" component={withAuthentication(Settings)}></Route>
        <Route path="/roomsandmeters" component={withAuthentication(RoomsAndMeters)}></Route>
        <Route path="/logout" component={withAuthentication(Logout)}></Route>
        <Route path="/facts" component={withAuthentication(Facts)}></Route>
      </>
    )

    return (
      <div className="App">
        <Router >
          <Switch>
            <Route exact path="/" component={Authenticate}></Route>
            <Route path="/login" component={LoginFormik}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route component={ DefaultContainer }></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
