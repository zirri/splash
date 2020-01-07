import React from 'react';
import { Link } from 'react-router-dom';
import Today from './Today';
import Week from './Week';



class Overview extends React.Component {
 
    render() {
        return (
            <div>
                <br />
                Overview
            <p>Today</p>
            <Link to='/today'>Today</Link>
            <p>This week</p>
            </div>
            
        )
    }
}

export default Overview;
