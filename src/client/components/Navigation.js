import React from 'react';


import { Navbar, Nav, Tab, Tabs, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import settings from '../svg/Settings.svg';
import facts from '../svg/Facts.svg';
import rooms from '../svg/Rooms.svg';
import logout from '../svg/Logout.svg';
import profile from '../svg/Profile.svg';


class Navigation extends React.Component {

  componentDidMount(){
    try{

    } catch(error){
      console.log(error)
    }
  }
    
    render() {
        return(
          
          <header>
            <Navbar collapseOnSelect className="ml-auto " bg="light" expand="lg" >

              <Navbar.Brand className="logoname ">
                <NavLink to="/home">splash</NavLink>
              </Navbar.Brand>
              <Navbar.Toggle  />
              <Navbar.Collapse  id="basic-navbar-nav" >
                <Nav style={{margin:0, padding:0}} className="mr-auto text-left"  >
                  <img src={profile} alt="Logo"/> <h2 className="text-center">Full name</h2>
                  <Nav.Link as={NavLink} to="/home" eventKey="home" >Home</Nav.Link>
                  <Nav.Link as={Link} eventKey="settings" to="/settings"style={{backgroundColor:"#F1F9FF"}} > 
                    <img src={settings} alt="Logo"/>
                    Settings
                  </Nav.Link> 
                  <Nav.Link  as={Link} eventKey="facts" to="/facts"style={{backgroundColor:"#BCE0FD"}} > 
                    <img src={facts} alt="Logo"/> 
                    Facts
                  </Nav.Link> 
                  <Nav.Link as={Link} eventKey="roomsandmeters" to="/roomsandmeters" style={{backgroundColor:"#80ACD2", color:"white"}} >
                    <img src={rooms} alt="Logo"/> 
                    Rooms and water 
                  </Nav.Link>
                  <Nav.Link as={Link} eventKey="logout" to="/logout" style={{backgroundColor:"#1F65A1", color:"white"}}>
                    <img src={logout} alt="Logo"/> 
                    Log out
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>

            </Navbar>
          </header>
        )
    }
}

export default Navigation;