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
import { extend } from 'joi';
import { Router } from 'express';
//Stretch:
//Logout.Component
//Error.Component


// class Authentication extends React.Component{
//   constructor(props){
//     super(props);

//     this.state = {
//       isAuthenicated: false
//     }
//   }
//   componentDidMount(){
//     const token = localStorage.getItem('json-web-token');
//     const isValid = true; //her må tokenet sjekkes

//     if(!isValid){
//       Router.replace('/login');
//     }else{
//       this.setState({isAuthenicated:true})
//     }
//   }

//   render(){
//     const { isAuthenicated, children } = this.state;
//     return isAuthenicated ? children : <div>is authenticaing</div>
//   }
// }

function withAuthentication(Component){
  return class extends React.Component{
    render(){
      return (
        // <Authentication>
          <Component {...this.props} />
        // </Authentication>
      )
    }
  }
}

class App extends React.Component {
  render(){
    const DefaultContainer = () => (
      <>
        <Navigation />
        <Route path="/home" component={withAuthentication(Overview)}></Route>
        <Route path="/account" component={withAuthentication(Account)}></Route>
        <Route path="/settings" component={withAuthentication(Settings)}></Route>
        <Route path="/roomsandmeters" component={withAuthentication(RoomsAndMeters)}></Route>
      </>
    )

    return (
      <div className="App">
        <HashRouter >
          <Switch>
            <Route exact path="/" component={Authenticate}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route component={ DefaultContainer }></Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
