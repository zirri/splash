import { subWeeks, getWeek, startOfToday, isAfter } from 'date-fns';

export function transformDataForCharts(UsageByPeriod, arrayOfColors) {
  if (UsageByPeriod.length === 0) {
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


export function getWaterRecordsToday(waterDataAll) {
  var startToday = startOfToday();
  const waterRecordsToday=waterDataAll.filter(record => {
    return isAfter(record.timestamp, startToday)
  })
  return waterRecordsToday;
}

export function getWaterRecordsThisWeek(waterDataAll) {
  const weekNumber = getWeek(new Date());
  const waterRecordsThisWeek=waterDataAll.filter(record => {
    return record.weekNumber === weekNumber
  })
  return waterRecordsThisWeek
}

export function getWaterHistorySixWeeks(waterDataAll) {
  let waterUsageSixWeeks = { weekNumber: [], totalAmount: [] };
  if (waterDataAll.length === 0) {
    return waterUsageSixWeeks;
  }
  for (let i = 5; i >= 0; i--) {
    const weekNumber = getWeek(subWeeks(new Date(), i));
    waterUsageSixWeeks.weekNumber.push(weekNumber);
    waterUsageSixWeeks.totalAmount.push(
      Math.floor(
        waterDataAll.reduce((totalUsage, record) => {
          if (record.weekNumber === weekNumber) {
            return totalUsage = totalUsage + (+record.amount);
          }
          return totalUsage;
        }, 0)
      )
    )
  }
  return waterUsageSixWeeks;
}

export function compileByMeterId(arrayOfWaterData) {
  return Object.values(
    arrayOfWaterData.reduce(
      (r, { meterId, room, source, userId, amount, timestamp, simulated_data }) => {
        r[meterId] = r[meterId] || {
          meterId,
          room,
          source,
          userId,
          amount: 0,
          timestamp,
          simulated_data
        };
        r[meterId].amount += +amount;
        return r;
      },
      {}
    )
  );
}