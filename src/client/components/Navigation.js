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

const stylesNavbarNav= {
  height: "100vh",
  textAlign: "left"
}


class Navigation extends React.Component {

    handleClick(){
      console.log("I clicked this")
    }
    render() {
        return(
          <>
            <Navbar className="ml-auto" bg="light" expand="lg">
              <Navbar.Brand className="logoname ">splash</Navbar.Brand>
              <Navbar.Toggle type="button" aria-controls="responsive-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={ stylesNavbarNav }>
                  <Nav.Link href="/settings">Settings</Nav.Link>
                  <Nav.Link href="/facts">Facts</Nav.Link>
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