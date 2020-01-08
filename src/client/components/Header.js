import React from 'react';


import { Navbar, Button, } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";




class Header extends React.Component {

  handleViewChange() {
    const { match, location, history } = this.props;
    console.log(history)
    history.goBack()
  }
  
  render() {
      return(
        <>
          <Navbar bg="light" expand="lg" >
            <Navbar.Brand className="logoname ">splash</Navbar.Brand>
            <Button onClick={this.handleViewChange.bind(this)}> back</Button>
            
          </Navbar>
          
         
        </>
      )
  }
}

export default withRouter(Header);