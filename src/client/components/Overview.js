import React from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Today from './Today';
import Week from './Week';



class Overview extends React.Component {
    
 
    render() {
        return (
            <main>
                Overview
            <p>Today</p>
            <Link to='/today'>Today</Link>
            <p>This week</p>
            </main>
        )
    }
}

export default Overview;
