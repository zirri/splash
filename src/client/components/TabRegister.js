import React from "react";

//REACT-BOOTSTRAP
import { Button, Tab } from "react-bootstrap";

//LOCAL
import { postWaterUsage } from "../services/water";

class TabRegister extends React.Components {
    
  async handleRegisterClick(amount, meterId) {
    const record = await postWaterUsage(amount, meterId);
    console.log(record);
  }

  render() {
    return (
      <Tab eventKey="register" title="REGISTER">
        <h2>Simulate water usage</h2>
        <Button onClick={this.handleRegisterClick.bind(this, 75, 123456)}>
          Take a 5 min shower (75L){" "}
        </Button>
        <Button onClick={this.handleRegisterClick.bind(this, 150, 123456)}>
          Take a 10 min shower (150L)
        </Button>
        <Button onClick={this.handleRegisterClick.bind(this, 37.5, 123456)}>
          Take a 5 min shower using 'sparedusj' (37,5L)
        </Button>
        <Button onClick={this.handleRegisterClick.bind(this, 20, 123321)}>
          Run the washing machine (20L)
        </Button>
        <Button onClick={this.handleRegisterClick.bind(this, 20, 123987)}>
          Use the dishwasher (20L)
        </Button>
        <Button onClick={this.handleRegisterClick.bind(this, 200, 123456)}>
          Take a bath (200L)
        </Button>
        <Button onClick={this.handleRegisterClick.bind(this, 6, 123789)}>
          Let water run for 30s to get cold water (6L)
        </Button>
        <Button onClick={this.handleRegisterClick.bind(this, 6, 123111)}>
          Flush the WC (6L)
        </Button>
      </Tab>
    );
  }
}

export default TabRegister;
