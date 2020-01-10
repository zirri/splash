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
  Container
} from "react-bootstrap";

//REACT-CHARTJS-2
import { HorizontalBar, Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

//REACT-ICONS
import {
  FaThumbsDown,
  FaThumbsUp,
  FaGrinBeam,
  FaFrownOpen,
  FaRegCommentDots
} from "react-icons/fa";

//LOCAL COMPONENTS

import { getWaterUsageToday, getWaterUsageThisWeek } from "../services/water";
import CarouselCaption from "react-bootstrap/CarouselCaption";
import { getFacts } from "../services/fact";

class Overview extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("json_web_token");
    const payload = jwtDecode(token);

    this.state = {
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

      console.log(waterUsageThisWeek);

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
    const { usageToday, usageThisWeek, facts } = this.state;
    // const source = usage.map(elem => {
    //   return (
    //     <div key={elem.meterId}>
    //       {elem.room}: {elem.source} {elem.amount}
    //     </div>
    //   );
    // });

    //CHARTS
    //DATA FOR CHARTS
    const avarageWaterConsumption = 180;

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
            labels: ["Empty"],
            datasets: [
                {data: [180],
                backgroundColor: ["#D5DEE5"],
                
                }
            ]
        }
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
            avarageWaterConsumption - totalUsageToday < 0 ? 0 : totalUsageToday
          ],
          backgroundColor: `${"#7FC4FD"}`
        },
        {
          label: "comparedData",
          data: [
            avarageWaterConsumption - totalUsageToday < 0
              ? 180
              : avarageWaterConsumption - totalUsageToday
          ],
          backgroundColor: `${
            totalUsageToday > avarageWaterConsumption ? "red" : "#D5DEE5"
          } `
        }
      ]
    };

    //THISWEEK DATA
    const totalUsageThisWeek = usageThisWeek.reduce(
      (acc, { amount }) => acc + amount,
      0
    );

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

    const fact = facts[Math.floor(Math.random() * facts.length)];
console.log(transformDataForCharts(usageToday, color))
    return (
      <>
        <Tabs
          defaultActiveKey="today"
          id="uncontrolled-tab-example"
          size="100vh"
        >
          <Tab eventKey="today" title="TODAY">
            <br></br>

            <Carousel wrap="true" interval="10000000">
              <Carousel.Item>
                  <Container>
                <h3> Your water usage: </h3>
                <h3>
                  {totalUsageToday} / {avarageWaterConsumption}L
                </h3>
                <HorizontalBar data={dataBar} options={optionBarChart} />

                <>
                  {totalUsageToday < avarageWaterConsumption ? (
                    <span style={{ color: "#7FC4FD" }}>
                      <FaGrinBeam size={48} />
                    </span>
                  ) : (
                    <span style={{ color: "#7FC4FD" }}>
                      <FaFrownOpen size={48} />
                    </span>
                  )}
                </>
                <CarouselCaption style={{ color: "black" }}>
                  The avarage citizen in Oslo consumes 180L water per day
                </CarouselCaption>
                </Container>
              </Carousel.Item>
              <Carousel.Item>
                  <Container>
                <h3 style={{ color: "black" }}>Overview</h3>
                <Doughnut
                  data={transformDataForCharts(usageToday, color)}
                  options={optionDoughnut}
                />
              </Container>
              </Carousel.Item>
            </Carousel>

            <Jumbotron fluid style={{ margin: 0 }}>
              <Container>
                <h4>Fact #{fact ? fact.id : ""}</h4>
                <p>{fact ? fact.fact : ""}</p>
                <h6>{fact ? fact.sourceDisplayName : ""} </h6>
                <FaRegCommentDots />
              </Container>
            </Jumbotron>
          </Tab>
          <Tab eventKey="week" title="WEEK">
            <Container>
                <h3> Your water usage: </h3>
                <h3>
                  {totalUsageThisWeek} / {avarageWaterConsumption}L
                </h3>
                <Doughnut
                data={transformDataForCharts(usageThisWeek, color)}
                options={optionDoughnut}
                />


            </Container>
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default Overview;
