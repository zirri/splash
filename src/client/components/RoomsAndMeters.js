import React from "react";

import { Button, Container, ListGroup, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

//LOCAL
import { getWaterUsageAll } from "../services/water";

class RoomsAndMeters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waterMeter: []
    };
  }

  async componentDidMount() {
    try {
      const waterMeters = await getWaterUsageAll();
      function compileByMeterId(arrayOfWaterData) {
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
          result[value.room].push({source: value.source, meterId: value.meterId })
          return result;
        },
        {}
        ))
      }
      console.log(compileByMeterId(waterMeters))
      this.setState({
        waterMeter: compileByMeterId(waterMeters)
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { waterMeter } = this.state;
    const meter = waterMeter.map((room) => {
      return (
        <main className="meters-align">
        <Row className="justify-content-md-center">
        <Col xs lg="2">
            <strong>{room[0]}</strong> 
            
            <p>{room[1].length > 1 ? room[1].length + " water meters" : room[1].length + " water meter" } </p> 
         </Col> 
         </Row>
         <Row className="justify-content-md-center">
         <Col xs lg="2" >
            <ListGroup variant="horizontal-left">
              {room[1].map((source) => <ListGroup.Item>{source.source}</ListGroup.Item> )}
            </ListGroup>
            </Col>
            </Row>
        </main>
      )
    })

    return (
      <div>
        
        <h4>Rooms and Water Meters</h4>
        
        <Container>

        {meter}

          <Button variant="primary" size="sm">
            <Link to="/addMeter" style={{ color: "white" }}>
            ADD WATER METER
            </Link>
          </Button>
        </Container>
     
      </div>
    );
  }
}

export default RoomsAndMeters;
