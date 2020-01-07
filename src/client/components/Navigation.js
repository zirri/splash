import React from 'react';


import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

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
              <Navbar.Brand className="logoname ">splash</Navbar.Brand>
              <Navbar.Toggle type="button" aria-controls="responsive-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto text-left"  >
                  <Link to="/settings">Settings</Link>
                  <Link to="/facts">Facts</Link>
                  <Link to="/facts">Rooms and water </Link>
                  <Link to="/logout">Log out</Link>
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