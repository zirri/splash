import React from 'react';


import { Navbar,  } from "react-bootstrap";
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

    handleClick(){
      console.log("I clicked this")
    }
    render() {
        return(
          <>
            <Navbar className="ml-auto" bg="light" expand="lg" fixed="top">
              <Navbar.Brand style={ stylesBrand } href="#home" className="logoname navbar-center">splash</Navbar.Brand>
              <Navbar.Toggle style= { stylesButton } onClick={this.handleClick.bind(this)}/>
        
            </Navbar>
            
            <nav>
              
            </nav>
          </>
        )
    }
}

export default Navigation;