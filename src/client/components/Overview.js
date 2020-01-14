//Plugins
import React from "react";
import jwtDecode from "jwt-decode";

//REACT-ROUTER-DOM
import { Link } from "react-router-dom";

//REACT-BOOTSTRAP
import {
  Tabs,
  Tab,
  Card,
  Carousel,
  Jumbotron,
  Container,
  Button,
  Col,
  Row
} from "react-bootstrap";

//REACT-CHARTJS-2
import { HorizontalBar, Doughnut, Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-plugin-annotation";

//REACT-ICONS
import {
  FaThumbsDown,
  FaThumbsUp,
  FaGrinBeam,
  FaFrownOpen,
  FaRegCommentDots,
  FaUser,
  FaUsers
} from "react-icons/fa";

//LOCAL COMPONENTS
import { getWaterUsageToday, getWaterUsageThisWeek } from "../services/water";
import CarouselCaption from "react-bootstrap/CarouselCaption";
import { getFacts } from "../services/fact";
import { getUserInformation } from "../services/users";

import TabRegister from "./TabRegister";

class Overview extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("json_web_token");
    const payload = jwtDecode(token);

    this.state = {
      user: [],
      usageToday: [],
      usageThisWeek: [],
      session: payload,
      facts: []
    };
  }

  async componentDidMount() {
    try {
      const waterUsageToday = await getWaterUsageToday();
      const waterUsageThisWeek = await getWaterUsageThisWeek();
      const userInformation = await getUserInformation();
      console.log(waterUsageToday);
      console.log(this.props);

      function compileByMeterId(arrayOfWaterData) {
        return Object.values(
          arrayOfWaterData.reduce(
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
      }

      const compiledDataToday = compileByMeterId(waterUsageToday);
      const compiledDataByWeek = compileByMeterId(waterUsageThisWeek);
      const facts = await getFacts();

      this.setState({
        user: userInformation,
        usageToday: compiledDataToday,
        usageThisWeek: compiledDataByWeek,
        facts
      });

      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { usageToday, usageThisWeek, facts, user } = this.state;
    // const source = usage.map(elem => {
    //   return (
    //     <div key={elem.meterId}>
    //       {elem.room}: {elem.source} {elem.amount}
    //     </div>
    //   );
    // });

    //CHARTS
    //DATA FOR CHARTS
    const averageWaterConsumption = 180;

    const color = [
      "#2699FB",
      "#5BB1F8",
      "#A7D4F8",
      "#80ACD2",
      "#F1F9FF",
      "#7FC4FD",
      "#1F65A1"
    ];

    //TRANSFORM DATA FOR CHARTS.JS COMPONENTS /DATA KEY TRANSFORMER
    function transformDataForCharts(UsageByPeriod, arrayOfColors) {
      if (UsageByPeriod.length == 0) {
        const data = {
          labels: [],
          datasets: [{ data: [180], backgroundColor: ["#D5DEE5"] }]
        };
        return data;
      }

      const amount = UsageByPeriod.map(elem => `${elem.amount}`);
      const rooms = UsageByPeriod.map(
        elem => `${UsageByPeriod.indexOf(elem) + 1} ${elem.room} ${elem.source}`
      );

      const data = {
        labels: rooms,
        datasets: [
          {
            data: amount,
            backgroundColor: arrayOfColors,
            hoverBackgroundColor: arrayOfColors,
            hoverBorderColor: "#5898CB",
            hoverBorderWidth: "1"
          }
        ]
      };

      return data;
    }

    //TODAY DATA
    const totalUsageToday = usageToday.reduce(
      (acc, { amount }) => acc + amount,
      0
    );

    const dataBar = {
      datasets: [
        {
          label: "waterUage",
          data: [
            averageWaterConsumption - totalUsageToday < 0 ? 0 : totalUsageToday
          ],
          backgroundColor: `${"#7FC4FD"}`
        },
        {
          label: "comparedData",
          data: [
            averageWaterConsumption - totalUsageToday < 0
              ? 180
              : averageWaterConsumption - totalUsageToday
          ],
          backgroundColor: `${
            totalUsageToday > averageWaterConsumption ? "red" : "#D5DEE5"
          } `
        }
      ]
    };

    //THISWEEK DATA
    const totalUsageThisWeek = usageThisWeek.reduce(
      (acc, { amount }) => acc + amount,
      0
    );

    //DUMMY & TEST DATA
    const totalUsageWeeks = [100, 200, 300, 200];
    const weekNumber = ["12", "13", "14", "15"];

    const dataCompareWeeks = {
      datasets: [
        {
          labels: "Water Consumption",
          data: totalUsageWeeks,
          backgroundColor: "#2699FB",
          hoverBackgroundColor: "#2699FB"
        }
      ],
      labels: weekNumber
    };

    //OPTIONS FOR CHARTS

    const optionDoughnut = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return (
              data.labels[tooltipItem.index] +
              ": " +
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] +
              "L"
            );
          }
        }
      },

      legend: {
        labels: {
          fontColor: "black"
        },
        position: "bottom"
      },
      plugins: {
        arc: true,
        datalabels: {
          formatter: function(value) {
            return value + "L";
          },
          color: "white"
        }
      }
    };

    const optionHalfDoughnut = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return (
              data.labels[tooltipItem.index] +
              ": " +
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] +
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
          formatter: function(value) {
            return value + "L";
          },
          color: "white"
        }
      }
    };

    const optionBarChart = {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      hover: {
        mode: null
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
    };

    const optionCompareWeeks = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return (
              data.labels[tooltipItem.index] +
              ": " +
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] +
              "L"
            );
          }
        }
      },

      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            id: "y-axis",
            ticks: {
              beginAtZero: true,
              callback: function(value) {
                return value + "L";
              },
              suggestedMax: Math.max(...totalUsageWeeks) + 50
            },
            scaleLabel: {
              display: true,
              labelString: "Water Usage L"
            }
          }
        ],
        xAxes: [
          {
            id: "x-axis",
            scaleLabel: {
              display: true,
              labelString: "Week"
            },
            gridLines: {
              display: false
            }
          }
        ]
      },
      plugins: {
        arc: true,
        datalabels: {
          anchor: "center",
          formatter: function(value) {
            return value + "L";
          },
          color: "white"
        }
      },
      annotation: {
        // Defines when the annotations are drawn.
        // This allows positioning of the annotation relative to the other
        // elements of the graph.
        //
        // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
        // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
        drawTime: "afterDatasetsDraw", // (default)

        // Mouse events to enable on each annotation.
        // Should be an array of one or more browser-supported mouse events
        // See https://developer.mozilla.org/en-US/docs/Web/Events
        events: ["click"],

        // Double-click speed in ms used to distinguish single-clicks from
        // double-clicks whenever you need to capture both. When listening for
        // both click and dblclick, click events will be delayed by this
        // amount.
        dblClickSpeed: 350, // ms (default)

        // Array of annotation configuration objects
        // See below for detailed descriptions of the annotation options
        annotations: [
          {
            //   drawTime: "afterDraw", //overrides annotation.drawTime if set
            id: "a-line-1", // optional
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis",
            value: averageWaterConsumption,
            borderColor: "red",
            borderWidth: 1,

            onClick: function(e) {
              console.log("hei", e);
            }
          }
        ]
      }
    };

    const fact = facts[Math.floor(Math.random() * facts.length)];
    console.log(transformDataForCharts(usageToday, color));
    return (
      <>
        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
          <Tab eventKey="today" title="TODAY">
            <Carousel wrap="true" interval="10000000">
              <Carousel.Item>
                <h3> Your water usage: </h3>
                <h3>
                  {totalUsageToday} / {averageWaterConsumption}L
                </h3>
                {user ? (
                  <p>
                    {user.noInHousehold > 1 ? <FaUsers /> : <FaUser />}
                    {user.noInHousehold}
                  </p>
                ) : (
                  ""
                )}
                <Container className="containerChartBar">
                  <HorizontalBar data={dataBar} options={optionBarChart} />
                </Container>
                <Container className="smile-icon">
                  {totalUsageToday < averageWaterConsumption ? (
                    <span style={{ color: "#7FC4FD" }}>
                      <FaGrinBeam size={48} />
                    </span>
                  ) : (
                    <span style={{ color: "#7FC4FD" }}>
                      <FaFrownOpen size={48} />
                    </span>
                  )}
                </Container>
                <p>The avarage citizen in Oslo consumes 180L water per day</p>
              </Carousel.Item>
              <Carousel.Item>
                <h3>Overview</h3>

                <Container className="containerChart">
                  <Doughnut
                    data={transformDataForCharts(usageToday, color)}
                    options={optionHalfDoughnut}
                  />
                </Container>
              </Carousel.Item>
            </Carousel>

            <Jumbotron fluid>
              <h4>Fact #{fact ? fact.id : ""}</h4>
              <p>{fact ? fact.fact : ""}</p>
              <h6>{fact ? fact.sourceDisplayName : ""} </h6>
              <FaRegCommentDots />
            </Jumbotron>
          </Tab>
          <Tab eventKey="week" title="WEEK">
            <Container fluid>
              <h3> Your water usage: </h3>
              <h3>
                {totalUsageThisWeek} / {averageWaterConsumption}L
              </h3>
              {user ? (
                <p>
                  {user.noInHousehold > 1 ? <FaUsers /> : <FaUser />}
                  {user.noInHousehold}
                </p>
              ) : (
                ""
              )}
              <Container className="containerChart">
                <Doughnut
                  data={transformDataForCharts(usageThisWeek, color)}
                  options={optionHalfDoughnut}
                />
              </Container>
            </Container>

            <Container fluid style={{ backgroundColor: "#CBDFF1" }}>
              <h3> Week comparison</h3>
              <Container className="containerChart">
                <Bar data={dataCompareWeeks} options={optionCompareWeeks} />
                <h6>- Average water consumption</h6>
              </Container>
            </Container>
          </Tab>
          <Tab eventKey="register" title="REGISTER">
            <TabRegister />
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default Overview;
