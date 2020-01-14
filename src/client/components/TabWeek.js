import React from "react";

//REACT-CHARTJS-2
import { Doughnut, Bar } from "react-chartjs-2";

//REACT-BOOTSTRAP
import { Container } from "react-bootstrap";

//REACT-ICONS
import { FaUser, FaUsers } from "react-icons/fa";

//LOCAL
import { transformDataForCharts } from "../utils/chartFunctions";

class TabWeek extends React.Component {
  render() {
    const { usageThisWeek, color, averageWaterConsumption, user } = this.props;

    //THISWEEK DATA
    const totalUsageThisWeek = usageThisWeek.reduce(
      (acc, { amount }) => acc + amount,
      0
    );

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

    return (
      <>
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
      </>
    );
  }
}

export default TabWeek;