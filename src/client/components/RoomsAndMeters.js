
import React from 'react';
import ApexCharts from 'apexcharts';


import { Button, ListGroup } from "react-bootstrap";

import { Link } from 'react-router-dom';

import Header from './Header';

class RoomsAndMeters extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <h2>Rooms and Water meters</h2>
        <ListGroup variant="flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>

        <Button variant="primary" size="sm">
          <Link to="/addMeter" style={{color:"white"}}>ADD WATER METER</Link>
        </Button>
      </div>
    );
  }
} 

export default RoomsAndMeters;
