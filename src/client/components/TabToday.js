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
import { HorizontalBar, Doughnut, Bar, Chart } from "react-chartjs-2";

//REACT-BOOTSTRAP
import {
  Carousel,
  Jumbotron,
  Container,
} from "react-bootstrap";


//LOCAL
import { transformDataForCharts, getWaterRecordsToday, compileByMeterId } from "../utils/chartFunctions";


Chart.defaults.global.maintainAspectRatio = true;
Chart.defaults.global.plugins.datalabels = true;

class TabToday extends React.Component {
  render() {

    const { fact, averageWaterConsumption, usageAll, color, user} = this.props;
    const averageWaterConsumptionHousehold = averageWaterConsumption*user.noInHousehold
    
    //TODAY DATA    
    const waterRecordsToday = getWaterRecordsToday(usageAll);
    const usageToday =compileByMeterId(waterRecordsToday);

    const totalUsageToday = usageToday.reduce(
      (acc, { amount }) => acc + amount,
      0
    );

    const randomFact = fact[Math.floor(Math.random() * fact.length)];

    const optionBarChart = {
      maintainAspectRatio: false,

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
      maintainAspectRatio: true,
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
        display: true,
        position: "bottom",
      },
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI,
      plugins: {
        arc: true,
        datalabels: {
          formatter: function(value) {
            return value + "L";
          },
          color: "white",
        }
      }
    };

    const dataBar = {
      datasets: [
        {
          label: "waterUage",
          data: [
            averageWaterConsumptionHousehold - totalUsageToday < 0 ? 0 : totalUsageToday
          ],
          backgroundColor: `${"#7FC4FD"}`
        },
        {
          label: "comparedData",
          data: [
            averageWaterConsumptionHousehold - totalUsageToday < 0
              ? 180
              : averageWaterConsumptionHousehold - totalUsageToday
          ],
          backgroundColor: `${
            totalUsageToday > averageWaterConsumptionHousehold ? "red" : "#D5DEE5"
          } `
        }
      ]
    };

    return (
      <>
        <Carousel interval="10000000" className="carousel-slide">
          <Carousel.Item className="slide-page-1">
            <h2> Your water usage </h2>
            <p>
              
              Total for household ({user.noInHousehold} pers)<br />
              <br />
              {totalUsageToday} / {averageWaterConsumptionHousehold}L* 
            </p>
            <div className="space"></div>
            
            <Container className="containerChartBToday">
              <HorizontalBar data={dataBar} options={optionBarChart} />
            </Container>
            <div className="space"></div>

            <Container className="response-box">
              {totalUsageToday < averageWaterConsumptionHousehold ? (
                <span>
                  <FaGrinBeam size={64} />
                </span>
              ) : (
                <span>
                  <FaFrownOpen size={64} />
                </span>
              )}

            <div className="space"></div>
            
              <p className="info-p">* Your water consumption compared to avarage Oslo citizen; 180L water per day</p>
            </Container>
          </Carousel.Item>
          <Carousel.Item className="slide-page-2">
            <h2>Overview per source</h2>
            <div className="space"></div>

            <Container
              className="containerChartDToday"
              style={{ position: "relative", heigth: "100vh" }}
            >
              <Doughnut
                data={transformDataForCharts(usageToday, color)}
                options={optionHalfDoughnut}
              />
            </Container>
          </Carousel.Item>

          <Carousel.Item className="slide-page-3">
          <h2> Your water usage: </h2>
          <div className="space"></div>

            <Jumbotron className="fact-box">
              <h4>Fact #{randomFact ? randomFact.id : ""}</h4>
              
              <p>{randomFact ? randomFact.fact : ""}</p>
              <cite>{randomFact ? randomFact.sourceDisplayName : ""} </cite>
            </Jumbotron>
          </Carousel.Item>
        </Carousel>
      </>
    );
  }
}

export default TabToday;
