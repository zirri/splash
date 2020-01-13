import React from "react";

import { Button, Card, Container } from "react-bootstrap";

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
        return Object.values(
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
    console.log(waterMeter)
    const meter = waterMeter.map((room) => {
      return (
        <Card>
          <Card.Header>
            {room.room} : {room.source}
          </Card.Header>
          <Card.Body>
            {room.source}
          </Card.Body>
        </Card> 
      )
    })

    return (
      <div>
        <h4>Rooms and Water meters</h4>

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
