//Plugins
import React from "react";
import jwtDecode from "jwt-decode";

//REACT-ROUTER-DOM
import { Link } from "react-router-dom";

//REACT-BOOTSTRAP
import { Tabs, Tab, Card, Carousel } from "react-bootstrap";

//REACT-CHARTJS-2
import { HorizontalBar, Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

//REACT-ICONS
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

//LOCAL COMPONENTS

import { getWaterUsage } from "../services/water";

class Overview extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("json_web_token");
    const payload = jwtDecode(token);

    this.state = {
      usage: [],
      session: payload,
     
    };
  }

  async componentDidMount() {
    try {
      
      const water = await getWaterUsage();
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
    const { usage, indexCarousel, directionCarousel } = this.state;
    // const source = usage.map(elem => {
    //   return (
    //     <div key={elem.meterId}>
    //       {elem.room}: {elem.source} {elem.amount}
    //     </div>
    //   );
    // });
    const avarageWaterConsumption = 180;
    const amount = usage.map(elem => `${elem.amount}`);
    const rooms = usage.map(
      elem => `${usage.indexOf(elem) + 1} ${elem.room} ${elem.source}`
    );
    const totalUsage = usage.reduce((acc, { amount }) => acc + amount, 0);
    const color = ["#2699FB", "#5BB1F8", "#A7D4F8", "#F1F9FF", "#7FC4FD"];

    const data = {
      labels: rooms,
      datasets: [
        {
          data: amount,
          backgroundColor: color,
          hoverBackgroundColor: color,
          hoverBorderColor: "#5898CB",
          hoverBorderWidth: "1"
        }
      ]
    };

    const dataBar = {
      datasets: [
        {
          label: "waterUage",
          data: [avarageWaterConsumption - totalUsage < 0
            ? 0:  totalUsage],
          backgroundColor: `${"#7FC4FD"
          }`
        },
        {
          label: "comparedData",
          data: [
            avarageWaterConsumption - totalUsage < 0
              ? 180
              : avarageWaterConsumption - totalUsage
          ],
          backgroundColor: `${totalUsage > avarageWaterConsumption ? "red" : "lightgrey"}  ` 
        }
      ]
    };

    return (
      <>
        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example" >
          <Tab eventKey="today" title="TODAY" >
              <br></br>

              <Carousel interval="false">
      <Carousel.Item>
        <img
          className="d-block w-100"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
            <Card  style= {{border: "none"}} > 
              <Card.Text>Your water usage:</Card.Text>
              <Card.Body>
                <Card.Text>
                  <h5>
                    {totalUsage} / {avarageWaterConsumption}L
                  </h5>
                </Card.Text>
                <HorizontalBar
                  data={dataBar}
                  options={{
                    legend: {
                      display: false
                    },
                    tooltips: {
                      enabled: false
                    },
                    scales: {
                      xAxes: [
                        {
                          display: false,
                          stacked: true
                        }
                      ],
                      yAxes: [
                        {
                          display: false,
                          stacked: true
                        }
                      ]
                    },
                    //WITHOUT DATALABALS ON BAR-ITEM
                    plugins: {
                      datalabels: false
                    }
                  }}
                />

                {totalUsage < avarageWaterConsumption ? (
                  <span style={{color:"#7FC4FD"}}>
                    <FaThumbsUp size={48}/>
                  </span>
                ) : (
                  <span style={{color:"#7FC4FD"}}>
                    <FaThumbsDown size={48}/>
                  </span>
                )}

                <Doughnut
                  data={data}
                  options={{
                    tooltips: {
                      callbacks: {
                        label: function(tooltipItem, data) {
                          return (
                            data.labels[tooltipItem.index] +
                            ": " +
                            data.datasets[tooltipItem.datasetIndex].data[
                              tooltipItem.index
                            ] +
                            "L"
                          );
                        }
                      }
                    },

                    cutoutPercentage: 60,
                    legend: {
                      labels: {
                        fontColor: "black"
                      },
                      position: "bottom"
                    },
                    rotation: 1 * Math.PI,
                    circumference: 1 * Math.PI,
                    plugins: {
                      arc: true,
                      datalabels: {
                        position: "outside",
                        formatter: function(value) {
                          return value + "L";
                        },
                        color: "white"
                      }
                    }
                  }}
                />

                <Card.Text>
                  The avarage citizen in Oslo consumes {avarageWaterConsumption}
                  L water per day
                </Card.Text>
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
