import React from 'react';


import { Navbar, Nav, Tab, Tabs, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import settings from '../svg/Settings.svg';
import facts from '../svg/Facts.svg';
import rooms from '../svg/Rooms.svg';
import logout from '../svg/Logout.svg';
import profile from '../svg/Profile.svg';
import { getUserInformation } from '../services/users';


class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
    }
  }
  async componentDidMount(){
    try{
      const user = await getUserInformation()

      this.setState({
        user
      })

    } catch(error){
      console.log(error)
    }
  }
    
    render() {
        const user = this.state.user;

        return(
          
          <header >
            <Navbar collapseOnSelect className="mr-auto " expand="xl">

              <Navbar.Toggle />
              <Navbar.Brand className="logoname text" >
                <NavLink to="/home">splash</NavLink>
              </Navbar.Brand>
              <Container fluid="true">
              <Navbar.Collapse id="basic-navbar-nav" >
                <Nav style={{margin:0, padding:0}} className="mr-auto "  >
                  <img src={profile} alt="Logo" className="profile-img"/> 
                  <Nav.Link as={NavLink} to="/" style={{pointerEvents: "none", fontWeight:"bold"}} className="disabled-link" >{user.fullName} </Nav.Link>
                  <Nav.Link as={NavLink} to="/home" eventKey="home" >Home</Nav.Link>
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