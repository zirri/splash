import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Today from "./Today";
import Week from "./Week";

import { getWaterUsage } from "../services/water";

import { Tabs, Tab, Card,} from "react-bootstrap";
import RoomsAndMeters from "./RoomsAndMeters";

class Overview extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("json_web_token");
    const payload = jwtDecode(token);

    this.state = {
      usage: [],
      session: payload
    };
  }

  async componentDidMount() {
    try {
      const { session } = this.state;
      const water = await getWaterUsage(session.userId);
      console.log(water);

      const usage = Object.values(
        water.reduce(
          (r, { meterId, room, source, userId, amount, timestamp }) => {
            r[meterId] = r[meterId] || {
              meterId,
              room,
              source,
              userId,
              amount: 0,
              timestamp
            };
            r[meterId].amount += +amount;
            return r;
          },
          {}
        )
      );

      this.setState({
        usage
      });

      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { usage } = this.state;

    const source = usage.map((elem) => {
      return (
    <div key={elem.meterId}>{elem.room}: {elem.source} {elem.amount}</div>
      );
    });

    const totalUsage = usage.reduce((acc, {amount}) => acc + amount ,0)

    return (
      <>
        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
          <Tab eventKey="today" title="TODAY">
            <Card>
                <Card.Title>Your water usage</Card.Title>
                <h5>{totalUsage}L</h5>
                <Card.Body>
                    {source}
                </Card.Body>
               
            </Card>
          </Tab>
          <Tab eventKey="week" title="WEEK">
            <h2>WEEK</h2>
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default Overview;
