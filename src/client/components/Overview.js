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
import {  getWaterUsageAll } from "../services/waterusage";
import { getFacts } from "../services/fact";
import { getUserInformation } from "../services/users";

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
      usageAll: [],
      session: payload,
      facts: []
    };
  }

  async componentDidMount() {
    try {
      const usageAll = await getWaterUsageAll();
      const userInformation = await getUserInformation();
      const facts = await getFacts();     

      this.setState({
        user: userInformation,
        usageAll,
        facts
      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { usageAll, facts, user } = this.state;

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
            <TabToday fact={facts} usageAll={usageAll} color={color} averageWaterConsumption={averageWaterConsumption*user.noInHousehold} user={user}/>
          </Tab>
          <Tab eventKey="week" title="WEEK">
            <TabWeek usageAll={usageAll} user={user} color={color} averageWaterConsumption={averageWaterConsumption*user.noInHousehold} />
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
