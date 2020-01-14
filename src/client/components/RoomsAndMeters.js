//Plugins
import React from "react";
import { Link } from "react-router-dom";

//Bootstrap
import { Button, Container, ListGroup, Row, Col } from "react-bootstrap";

//LOCAL
import { getWaterUsageAll } from "../services/water";

class RoomsAndMeters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waterMeters: []
    };
  }

  compileByMeterId(arrayOfWaterData) {
    const reduceToMeterId = Object.values(
      arrayOfWaterData.reduce(
        (r, { meterId, room, source }) => {
          r[meterId] = r[meterId] || {
            meterId,
            room,
            source
          };
          return r;
        },
        {}
      )
    );

    return Object.entries(reduceToMeterId.reduce((result, value) => {
      result[value.room] = result[value.room] || [];
      result[value.room].push({ source: value.source, meterId: value.meterId })
      return result;
    },
      {}
    ))
  }

  async componentDidMount() {
    try {
      const waterMeters = await getWaterUsageAll();
      const arrayRoomsWithMeters = this.compileByMeterId(waterMeters);
      this.setState({
        waterMeters: arrayRoomsWithMeters
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { waterMeters } = this.state;
    const meter = waterMeters.map((room) => {
      return (
        <div className="meters-align" key={room}>
          <Row className="justify-content-md-center">
            <Col xs lg="2">
              <h3>{room[0]}</h3>
              <p>{room[1].length > 1 ? room[1].length + " water meters" : room[1].length + " water meter"} </p>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs lg="2" >
              <ListGroup variant="horizontal-left">
                {room[1].map((source) => <ListGroup.Item key={source.source}>{source.source}</ListGroup.Item>)}
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
          <Button variant="primary" size="sm">
            <Link to="/addMeter" style={{ color: "white" }}>
              ADD WATER METER
            </Link>
          </Button>
        </Container>
      </main>
    );
  }
}

export default RoomsAndMeters;
