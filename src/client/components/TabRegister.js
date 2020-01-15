import React from "react";
import { FaShower, FaToilet, FaBath } from "react-icons/fa";
import { GiTap } from "react-icons/gi";
import washingMachine from '../icons/WashingMachine.svg'
import dishwasher from '../icons/Dishwasher.svg'


//REACT-BOOTSTRAP
import { Button, Row, Col, ListGroup, Accordion, Card } from "react-bootstrap";

//LOCAL
import { postWaterUsage } from "../services/water";



class TabRegister extends React.Component {

  async handleRegisterClick(amount, meterId) {
    await postWaterUsage(amount, meterId);
    window.location.reload(false);
  }

 
  render() {
    //     <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 20, 123321)}> Run the washing machine (20L) </Button> 
    //     <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 20, 123987)} > Use the dishwasher (20L) </Button> 
    //     <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 6, 123789)} > Let water run for 30s to get cold water (6L) </Button>
    //     </Col>
    //     <Button onClick={this.backButton.bind(this)}>
    //       back
    //     </Button>
    //     </>
    //   )
    // }
    return (
        <main id="box" className="meters-align">
          <Row className="meters-align">        
            <h2 className="meters-align ">
              Simulate water usage
            </h2>
          </Row>

          <Row className="justify-content-md-center meters-align ">
            <Col xs lg="3" className="split">
            <ListGroup variant='flush' defaultActiveKey="#link1">
            <ListGroup.Item >
              Bathroom
            </ListGroup.Item>
            <Accordion>
              <Card border="light">
                <Accordion.Toggle as={Card.Header} eventKey="0" >
                  <FaShower className="pad"/> Shower
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 75, 123456)} > Take a 5 min shower <br/>(75L){" "}</Button>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="0">
                  <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 150, 123456)} > Take a 10 min shower (150L) </Button>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="0">
                  <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 37.5, 123456)} > Take a 5 min shower, 'sparedusj' (37,5L) </Button>
                  </Accordion.Collapse>
              </Card>
              </Accordion>
              <Accordion>
              <Card border="light">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <FaBath className="pad"/> Bath
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 200, 123456)} > Take a bath (200L) </Button>
                </Accordion.Collapse>
              </Card>
              </Accordion>
              <Accordion>
              <Card border="light">
                <Accordion.Toggle as={Card.Header} eventKey="0" >
                  <FaToilet className="pad"/> Toilet
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 4, 123111)} > Flush the WC <br/> (big button) (4L) </Button>
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="0">
                  <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 2.5, 123111)} > Flush the WC <br/> (small button) (2.5L) </Button>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Accordion>
              <Card border="light">
                <Accordion.Toggle as={Card.Header} eventKey="0" >
                  <GiTap className="pad"/> Tap
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 12, 0)} > Brush teeth for one minute (12L) </Button>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            <ListGroup.Item>
              Kitchen
            </ListGroup.Item>
            <Accordion>
              <Card border="light">
                <Accordion.Toggle as={Card.Header} eventKey="0" >
                  <GiTap className="pad"/> Tap
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 6, 123789)} > Let water run for 30s <br/>to get cold water (6L) </Button>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Accordion>
              <Card border="light">
                <Accordion.Toggle as={Card.Header} eventKey="0" >
                  <img src={dishwasher} alt="dishwasher-logo" className="pad"/> Dishwasher
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 20, 123987)} > Run dishwasher (20L) </Button>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            </ListGroup>
            </Col>
            <Col xs lg="3" className="split">
              <ListGroup variant="flush">
            <ListGroup.Item>
              Laundry
            </ListGroup.Item>
            <Accordion>
             <Card border="light">
                <Accordion.Toggle as={Card.Header} eventKey="0" >
                <img src={washingMachine} alt="Logo" className="pad"/> Laundry
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 20, 123321)} > Run washing machine (20L) </Button>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            <ListGroup.Item>
              Outdoors
            </ListGroup.Item>
            <Accordion >
            <Card border="light">
            <Accordion.Toggle as={Card.Header} eventKey="0" >
                  <GiTap className="pad"/> Outdoor tap
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 6, 0)} > Use water hose  </Button>
                </Accordion.Collapse>
            </Card>
            </Accordion>
            </ListGroup>
            </Col>
            
          </Row>
        </main>
    );
  }
}

export default TabRegister;
