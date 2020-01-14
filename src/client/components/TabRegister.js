import React from "react";
import { FaShower, FaToilet, FaBath } from "react-icons/fa";
import { GiTap } from "react-icons/gi";


//REACT-BOOTSTRAP
import { Button, Tab, Row, Col, ListGroup, Accordion, Card } from "react-bootstrap";

//LOCAL
import { postWaterUsage } from "../services/water";



class TabRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: ''
  }

  }


  async handleRegisterClick(amount, meterId) {
    await postWaterUsage(amount, meterId);
    window.location.reload(false);
  }

  alertClicked(show) {
    this.setState({view: show})
   }
   
   backButton() {
    this.setState({view:''})
   }

  render() {
   
    if(this.state.view === 'bath') {
      return (
        <>
        <div>This is the bath</div>
        <Col xs lg="3">
        <Accordion >
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" >
              <FaShower />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 75, 123456)} > Take a 5 min shower (75L){" "}</Button>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="0">
              <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 150, 123456)} > Take a 10 min shower (150L) </Button>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="0">
             <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 37.5, 123456)} > Take a 5 min shower using 'sparedusj' (37,5L) </Button>
             </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <FaBath />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 200, 123456)} > Take a bath (200L) </Button>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2" >
              <FaToilet />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 4, 123111)} > Flush the WC (big button) (4L) </Button>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="2">
              <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 2.5, 123111)} > Flush the WC (small button) (2.5L) </Button>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        </Col>

        <Button onClick={this.backButton.bind(this)}>
          back
        </Button>
        </>
      )
    }

    if(this.state.view === 'kitchen') {
      return (
        <>
        <div>This is the kitchen</div>
        <Col xs lg="3">
        <Accordion >
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" >
              <GiTap />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
            <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 6, 123789)} > Let water run for 30s to get cold water (6L) </Button>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <FaBath />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 200, 123456)} > Take a bath (200L) </Button>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 20, 123321)}> Run the washing machine (20L) </Button> 
        <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 20, 123987)} > Use the dishwasher (20L) </Button> 
        <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 6, 123789)} > Let water run for 30s to get cold water (6L) </Button>
        </Col>
        <Button onClick={this.backButton.bind(this)}>
          back
        </Button>
        </>
      )
    }
    return (
        <main id="box" className="meters-align">

          <Row className="justify-content-md-center meters-align">
        
            <h2 className="justify-content-md-center meters-align">
              Simulate water usage
            </h2>
          </Row>
          <Row className="justify-content-md-center meters-align">
            <Col xs lg="3">
              
            <ListGroup variant='flush' defaultActiveKey="#link1">
            <ListGroup.Item action onClick={this.alertClicked.bind(this, 'bath')}>
              Bathroom
            </ListGroup.Item>
            <ListGroup.Item action onClick={this.alertClicked.bind(this, 'kitchen')}>
              Kitchen
            </ListGroup.Item>
            </ListGroup>
            </Col>
          </Row>
        </main>
    );
  }
}

export default TabRegister;
