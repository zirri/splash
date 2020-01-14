import { FaMarsDouble } from "react-icons/fa";

export function transformDataForCharts(UsageByPeriod, arrayOfColors) {
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


