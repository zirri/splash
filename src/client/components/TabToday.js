import React from "react";

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

//REACT-CHARTJS-2
import { HorizontalBar, Doughnut, Bar } from "react-chartjs-2";

//REACT-BOOTSTRAP
import {
  Carousel,
  Jumbotron,
  Container,
} from "react-bootstrap";


import { transformDataForCharts, getWaterRecordsToday, compileByMeterId } from "../utils/chartFunctions";



class TabToday extends React.Component {
  render() {

<<<<<<< HEAD
		const { fact, averageWaterConsumption, usageAll, color, user} = this.props

=======
		const { fact, averageWaterConsumption, usageToday, color, user} = this.props
>>>>>>> eedc9cc15a0076c2f06847d2c1b176c3041ba0d7
    //TODAY DATA    
    const waterRecordsToday = getWaterRecordsToday(usageAll);
    const usageToday =compileByMeterId(waterRecordsToday);

    const totalUsageToday = usageToday.reduce(
      (acc, { amount }) => acc + amount,
      0
    );

		const randomFact = fact[
      Math.floor(Math.random() * fact.length)
    ];

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

    return (
      <>
        <Carousel interval="10000000" className="carousel-slide">
          <Carousel.Item>
            <h2> Your water usage: </h2>
            <p>
              {totalUsageToday} / {averageWaterConsumption}L <br></br>
              ({averageWaterConsumption/user.noInHousehold}L/person)
            </p>
            {user ? (
              <p>
                {user.noInHousehold > 1 ? <FaUsers /> : <FaUser />}
                {user.noInHousehold}
              </p>
            ) : (
              ""
            )}
            <Container className="containerChartBToday">
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

            <Container className="containerChartDToday">
              <Doughnut
                data={transformDataForCharts(usageToday, color)}
                options={optionHalfDoughnut}
              />
            </Container>
          </Carousel.Item>
        </Carousel>

        <Jumbotron fluid>
          <h4>Fact #{randomFact ? randomFact.id : ""}</h4>
          <p>{randomFact ? randomFact.fact : ""}</p>
          <h6>{randomFact ? randomFact.sourceDisplayName : ""} </h6>
          <FaRegCommentDots />
        </Jumbotron>
      </>
    );
  }
}

export default TabToday;
