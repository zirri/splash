//Plugins
import React from "react";
import jwtDecode from "jwt-decode";

//icons
import { FaShower, FaToilet, FaBath } from "react-icons/fa";
import { GiTap } from "react-icons/gi";
import washingMachine from '../icons/WashingMachine.svg'
import dishwasher from '../icons/Dishwasher.svg'

//REACT-BOOTSTRAP
import { Button, Row, Col, ListGroup, Accordion, Card, InputGroup, FormControl } from "react-bootstrap";

//LOCAL
import { postWaterUsage } from "../services/waterusage";
import { getWaterMeters, postWaterMeter } from '../services/watermeters';
import Errorview from './Errorview';



class TabRegister extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("json_web_token");
    const payload = jwtDecode(token);

    this.state = {
      minutesShower: null,
      user: payload,
      waterMeters: [],
      error: null
    }
  }

  async componentDidMount() {
    try {
      const waterMeters = await getWaterMeters();
      this.setState({ waterMeters })
    } catch (error) {
      this.setState({ error })
    }
  }

  async handleRegisterClick(amount, room, source) {
    const { waterMeters } = this.state;
    let meterId;
    try {
      const waterMeterInRoom = waterMeters.filter(allMeters => {
        return room === allMeters.room
      })
      const waterMeterRoomAndSource = waterMeterInRoom.filter(metersInRoom => {
        return source === metersInRoom.source;
      })
      if (waterMeterRoomAndSource.length === 0) {
        const newWaterMeter = await postWaterMeter(0, room, source);
        meterId = newWaterMeter.meterId;
      } else if (waterMeterRoomAndSource.length > 1) {
        throw new Error('more than one water meter on this room and source')
      } else {
        meterId = waterMeterRoomAndSource[0].meterId;
      }
      await postWaterUsage(amount, meterId);
      const updatedWaterMeters = await getWaterMeters();
      this.setState({waterMeters:updatedWaterMeters}) 
    } catch (error) {
      this.setState({ error })
    }
    window.location.reload(false);
  }

  handleInputChange(event) {
    this.setState({
      minutesShower: +event.target.value * 6
    })
  }

  showerLiters(event) {
    const amount = this.state.minutesShower;
    this.handleRegisterClick(amount, 'bathroom', 'shower');
  }


  render() {
    const { error } = this.state;

    if (error) {
      return <Errorview error={error} />
    }

    return (
      <main id="box" >
        <Row >
          <h2 className="meters-align">Simulate water usage</h2>
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
                    <FaShower className="pad" /> Shower
                </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 30, 'bathroom', 'shower')} > Take a 5 min shower <br />(30L){" "}</Button>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 60, 'bathroom', 'shower')} > Take a 10 min shower <br/>(60L) </Button>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0">
                    <InputGroup type="number" name="minutesShower" className=" mb-3">
                      <div className="data-registration custom-reg">Custom shower time: </div>
                      <FormControl
                  
                        placeholder="minutes"
                        aria-label="minutes"
                        aria-describedby="basic-addon1"
                        value={this.state.value}
                        onChange={this.handleInputChange.bind(this)}
                      />
                      
                      <InputGroup.Append>
                        <Button onClick={this.showerLiters.bind(this)} variant="primary" >Add</Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Accordion.Collapse>
                  </Card>
              </Accordion>
              <Accordion>
                <Card border="light">
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <FaBath className="pad" /> Bath
                </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 200, 'bathroom', 'tub')} > Take a bath (200L) </Button>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <Accordion>
                <Card border="light">
                  <Accordion.Toggle as={Card.Header} eventKey="0" >
                    <FaToilet className="pad" /> Toilet
                </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 4, 'bathroom', 'toilet')} > Flush the WC <br /> (big button) (4L) </Button>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 2.5, 'bathroom', 'toilet')} > Flush the WC <br /> (small button) (2.5L) </Button>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <Accordion>
                <Card border="light">
                  <Accordion.Toggle as={Card.Header} eventKey="0" >
                    <GiTap className="pad" /> Tap
                </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 12, 'bathroom','tap')} > Brush teeth for one minute (12L) </Button>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </ListGroup>
          </Col>
          <Col xs lg="3" className="split">
            <ListGroup variant="flush">
              <ListGroup.Item>
                Kitchen
            </ListGroup.Item>
              <Accordion>
                <Card border="light">
                  <Accordion.Toggle as={Card.Header} eventKey="0" >
                    <GiTap className="pad" /> Tap
                </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 6, 'kitchen', 'tap')} > Let water run for 30s <br />to get cold water (6L) </Button>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 30, 'kitchen', 'tap')} > Do dishes by hand <br />(fill sink) (30L) </Button>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <Accordion>
                <Card border="light">
                  <Accordion.Toggle as={Card.Header} eventKey="0" >
                    <img src={dishwasher} alt="dishwasher-logo" className="pad" /> Dishwasher
                </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 12, 'kitchen', 'dishwasher')} > Run dishwasher (12L) </Button>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <ListGroup.Item>
                Laundry
            </ListGroup.Item>
              <Accordion>
                <Card border="light">
                  <Accordion.Toggle as={Card.Header} eventKey="0" >
                    <img src={washingMachine} alt="Logo" className="pad" /> Laundry
                </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 50, 'laundry', 'washingmachine')} > Run washing machine, regular (50L) </Button>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 30, 'laundry', 'washingmachine')} > Run washing machine, ECO mode (30L) </Button>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <ListGroup.Item>
                Outdoors
            </ListGroup.Item>
              <Accordion >
                <Card border="light">
                  <Accordion.Toggle as={Card.Header} eventKey="0" >
                    <GiTap className="pad" /> Outdoor tap
                </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Button className="data-registration" onClick={this.handleRegisterClick.bind(this, 6, 'outdoor', 'tap')} > Use water hose  </Button>
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
