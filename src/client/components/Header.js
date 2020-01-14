//PLUGINS
import React from 'react';
import { NavLink, withRouter } from "react-router-dom";

//LOCALE COMPONENTS
import { Navbar, Button, } from "react-bootstrap";


class Header extends React.Component {

  handleViewChange() {
    const { history } = this.props;
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