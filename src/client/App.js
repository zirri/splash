//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import './App.css';

//Components
import Overview from './components/Overview';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Settings from './components/Settings';


class App extends React.Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home" className="logoname">splash</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#/">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
              </Navbar.Collapse>
          </Navbar>
        </header>

        <HashRouter>
          <Switch>
            <Route path="/" exact component={Overview}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/settings" component={Settings}></Route>
          </Switch>
        </HashRouter>

        <h1 className="animated">splash</h1>
        <p>Your water measuring app</p>
      </div>
    );
  }
}

export default App;
