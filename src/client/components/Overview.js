import React from 'react';
import { Link } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
import Today from './Today';
import Week from './Week';

import { getWaterUsage } from '../services/water'


class Overview extends React.Component {
    constructor(props) {
        super(props);
    
       this.state={
           water: [],

       }  
    }

    async componentDidMount() {
        try {
            const water = await getWaterUsage(1)
            console.log(water)
            this.setState({
                water,
            })
        } catch (error) {
            console.log(error)
        }
    }
 
    render() {
        const { water } = this.state;
        console.log(water)
        return (
            
            <div>
                Overview
            <Today />
            <p>This week</p>
            </div>
        )
    }
}

export default Overview;
