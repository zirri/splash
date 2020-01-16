//Plugins
import React from "react";
import jwtDecode from "jwt-decode";


//REACT-BOOTSTRAP
import {
  Tabs,
  Tab,
} from "react-bootstrap";

//REACT-CHARTJS-2
import ChartDataLabels from 'chartjs-plugin-datalabels';


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
      user: payload,
      usageAll: [],
      facts: [],
      isLoading: true
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
        facts,
        isLoading: false,
      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { usageAll, facts, user, isLoading } = this.state;

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
    
    if(isLoading) {
      return(
        <div>Is loading...</div>
      )
    } 
    return (
      <>
        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
          <Tab eventKey="today" title="TODAY">
            <TabToday fact={facts} usageAll={usageAll} color={color} averageWaterConsumption={averageWaterConsumption} user={user}/>
          </Tab>
          <Tab eventKey="week" title="WEEK">
            <TabWeek usageAll={usageAll} user={user} color={color} averageWaterConsumption={averageWaterConsumption} />
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
