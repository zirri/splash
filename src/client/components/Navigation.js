//Plugins
import React from 'react';
import jwtDecode from "jwt-decode";

//Bootstrap
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

//React-icons 
import { IoMdHome } from 'react-icons/io'

//Locale icons and files
import settings from '../icons/Settings.svg';
import facts from '../icons/Facts.svg';
import rooms from '../icons/Rooms.svg';
import logout from '../icons/Logout.svg';
import profile from '../icons/Profile.svg';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("json_web_token");
    const payload = jwtDecode(token);

    this.state = {
      user: payload,
    }
  }

    
    render() {
        const user = this.state.user;

        return(
          
          <header >
            <Navbar collapseOnSelect className="navbar-in-header mr-auto" expand="xl">
              <Navbar.Toggle />

              <Navbar.Brand className="logoname text" >
                <Link style={{textDecoration: "none"}}to="/home">splash</Link>
              </Navbar.Brand>
              <Container fluid>
              <Navbar.Collapse id="basic-navbar-nav" >
                <Nav style={{margin:0, padding:0}} className="navbar-inside mr-auto "  >
                  <img src={profile} alt="Logo" className="profile-img"/> 
                  <Nav.Link as={Link} to="/" style={{pointerEvents: "none", fontWeight:"bold", fontSize:"1.2rem"}} className="disabled-link" >{user.fullName} </Nav.Link>
                  <Nav.Link as={Link} to="/home" eventKey="home" className="home-icon" ><IoMdHome /></Nav.Link>
                  <Nav.Link as={Link} eventKey="settings" to="/settings" > 
                    <img src={settings} alt="Logo"/>
                    Settings
                  </Nav.Link> 
                  <Nav.Link  as={Link} eventKey="facts" to="/facts" > 
                    <img src={facts} alt="Logo"/> 
                    Facts
                  </Nav.Link> 
                  <Nav.Link as={Link} eventKey="roomsandmeters" to="/roomsandmeters"  >
                    <img src={rooms} alt="Logo"/> 
                    Rooms and meters 
                  </Nav.Link>
                  <Nav.Link as={Link} eventKey="logout" to="/logout" >
                    <img src={logout} alt="Logo"/> 
                    Log out
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
        )
    }
}

export default Navigation;