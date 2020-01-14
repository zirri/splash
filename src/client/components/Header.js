import React from 'react';


import { Navbar, Button, } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";




class Header extends React.Component {

  handleViewChange() {
    const { match, location, history } = this.props;
    console.log(this.props)
    history.goBack()
  }
  
  render() {
      return(
        <header>
          <Navbar bg="light" expand="lg" >
            <Navbar.Brand className="logoname "><NavLink to="/home">splash</NavLink></Navbar.Brand>
            <Button onClick={this.handleViewChange.bind(this)}> back</Button>
            
          </Navbar>
        </header>
      )
  }
}

export default withRouter(Header);