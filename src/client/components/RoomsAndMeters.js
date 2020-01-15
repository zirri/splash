//Plugins
import React from "react";

//Bootstrap
import { Container, ListGroup, Row, Col } from "react-bootstrap";

//LOCAL
import { getWaterMeters } from "../services/watermeters";
import Errorview from './Errorview.js'

class RoomsAndMeters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waterMeters: [],
      error: null
    };
  }

  compileByMeterId(arrayOfWaterData) {
    return Object.entries(arrayOfWaterData.reduce((result, value) => {
      result[value.room] = result[value.room] || [];
      result[value.room].push({ source: value.source, meterId: value.meterId })
      return result;
    },
      {}
    ))
  }

  async componentDidMount() {
    try {
      const arrayOfWaterData = await getWaterMeters();
      const waterMeters = this.compileByMeterId(arrayOfWaterData) 
      if(waterMeters.error){throw new Error(waterMeters.error)}
      this.setState({
        waterMeters
      })
    } catch (error) {
      this.setState({error})
    }
  }

  render() {
    const { waterMeters, error } = this.state;

    if(error){
      return <Errorview error={error}/>
    }

    const meter = waterMeters.map((room) => {
      return (
        <div className="meters-align" key={room}>
          <Row className="justify-content-md-center">
            <Col xs lg="2">
              <h3>{room[0]}</h3>
              {/* <p>{room[1].length > 1 ? room[1].length + " water meters" : room[1].length + " water meter"} </p> */}
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs lg="2" >
              <ListGroup variant="horizontal-left">
                {room[1].map((source) => <ListGroup.Item key={source.meterId}>{source.source}</ListGroup.Item>)}
              </ListGroup>
            </Col>
          </Row>
        </div>
      )
    })

    return (
      <main>
        <h2>Rooms and Water Meters</h2>
        <Container>
          {meter}
        </Container>
      </main>
    );
  }
}

export default RoomsAndMeters;
