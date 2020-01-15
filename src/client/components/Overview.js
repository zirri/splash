//Plugins
import React from "react";
import jwtDecode from "jwt-decode";

//REACT-ROUTER-DOM
import { Link } from "react-router-dom";

//REACT-BOOTSTRAP
import {
  Tabs,
  Tab,
} from "react-bootstrap";

//REACT-CHARTJS-2
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-plugin-annotation";



//LOCAL COMPONENTS
import { getWaterUsageToday, getWaterUsageThisWeek, getWaterUsageAll } from "../services/waterusage";
import { getFacts } from "../services/fact";
import { getUserInformation } from "../services/users";
import { waterHistoryPerWeek, compileByMeterId } from '../utils/chartFunctions'

import TabRegister from "./TabRegister";
import TabToday from "./TabToday";
import TabWeek from './TabWeek'

class Overview extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("json_web_token");
    const payload = jwtDecode(token);

    this.state = {
      user: [],
      usageToday: [],
      usageThisWeek: [],
      usageHistory: {
        weekNumber: [],
        totalAmount: []
      },
      session: payload,
      facts: []
    };
  }

  async componentDidMount() {
    try {
      const waterUsageToday = await getWaterUsageToday();
      const waterUsageThisWeek = await getWaterUsageThisWeek();
      const usageAll = await getWaterUsageAll();
      const userInformation = await getUserInformation();
      const facts = await getFacts();

      console.log(waterUsageToday);
      console.log(this.props);

      const compiledSixWeekHistory = waterHistoryPerWeek(usageAll)
      const compiledDataToday = compileByMeterId(waterUsageToday);
      const compiledDataByWeek = compileByMeterId(waterUsageThisWeek);
      
      this.setState({
        user: userInformation,
        usageToday: compiledDataToday,
        usageThisWeek: compiledDataByWeek,
        usageHistory: compiledSixWeekHistory,
        facts
      });

      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { usageToday, usageHistory, usageThisWeek, facts, user } = this.state;
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
   
    //TODAY DATA
    



    return (
      <>
        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
          <Tab eventKey="today" title="TODAY">
            <TabToday fact={facts} usageToday={usageToday} color={color} averageWaterConsumption={averageWaterConsumption*user.noInHousehold} user={user}/>
          </Tab>
          <Tab eventKey="week" title="WEEK">
            <TabWeek usageThisWeek={usageThisWeek} user={user} color={color} averageWaterConsumption={averageWaterConsumption*user.noInHousehold} usageHistory={usageHistory}/>
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
