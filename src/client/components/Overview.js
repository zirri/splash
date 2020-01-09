//Plugins
import React from "react";
import jwtDecode from "jwt-decode";

//REACT-ROUTER-DOM
import { Link } from "react-router-dom";

//REACT-BOOTSTRAP
import { Tabs, Tab, Card } from "react-bootstrap";

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
      session: payload
    };
  }

  async componentDidMount() {
    try {
      const { session } = this.state;
      console.log(session.userId);
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
    console.log(this.state);
    const source = usage.map(elem => {
      return (
        <div key={elem.meterId}>
          {elem.room}: {elem.source} {elem.amount}
        </div>
      );
    });
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
    // const data = function transformData (labelsArr, dataArr) {
    //     const color = ['#2699FB', '#5BB1F8', '#A7D4F8', '#F1F9FF', '#7FC4FD']
    //     return (
    //         {
    //             labels: labelsArr,
    //             datasets: [{
    //                 data: dataArr,
    //                 backgroundColor: color,
    //                 hoverBackgroundColor: color
    //             }]
    //         }
    //     )
    // }

    const dataBar = {
      datasets: [
        {
          label: "waterUage",
          data: [totalUsage],
          backgroundColor: `${
            totalUsage > avarageWaterConsumption ? "red" : "#7FC4FD"
          }`
        },
        {
          label: "comparedData",
          data: [
            avarageWaterConsumption - totalUsage < 0
              ? 0
              : avarageWaterConsumption - totalUsage
          ],
          backgroundColor: "lightgrey"
        }
      ]
    };

    return (
      <>
        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example" >
          <Tab eventKey="today" title="TODAY" >
            <Card >
              <Card.Title>Your water usage:</Card.Title>
              <Card.Body style={{ height: "40vh", width: "80vw" }}>
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
                    <FaThumbsUp size={32}/>
                  </span>
                ) : (
                  <span style={{color:"#7FC4FD"}}>
                    <FaThumbsDown size={32}/>
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
