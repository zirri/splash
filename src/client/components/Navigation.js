import React from 'react';


import { Navbar, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import settings from '../svg/Settings.svg';
import facts from '../svg/Facts.svg';
import rooms from '../svg/Rooms.svg';
import logout from '../svg/Logout.svg';
import profile from '../svg/Profile.svg';


const stylesBrand= {
  // position: "absolute", 
  // right:"50%",
  width: "100%",
  textAlign: "center",
  margin:"0",
}

const stylesButton= {
  position: "absolute",
 
}




class Navigation extends React.Component {

    
    render() {
        return(
          <>
            <Navbar className="ml-auto "  bg="light" expand="lg" >
              <Navbar.Brand className="logoname " href="/home">splash</Navbar.Brand>
              <Navbar.Toggle type="button" aria-controls="responsive-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav" >
                
                <Nav className="mr-auto text-left"  >
                  <img src={profile} alt="Logo"/> <h2>Full name</h2>
                  <Link style={{backgroundColor:"#F1F9FF"}} to="/settings"><img src={settings} alt="Logo"/> Settings</Link>
                  <Link style={{backgroundColor:"#BCE0FD"}} to="/facts"><img src={facts} alt="Logo"/> Facts</Link>
                  <Link style={{backgroundColor:"#80ACD2", color:"white"}} to="/roomsandmeters"><img src={rooms} alt="Logo"/> Rooms and water </Link>
                  <Link style={{backgroundColor:"#1F65A1", color:"white"}} to="/logout"><img src={logout} alt="Logo"/> Log out</Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            
            {/* <nav id="navbar-collapse">
              
            </nav> */}
          </>
        )
    }
}

export default Navigation;