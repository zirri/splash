import React from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Today from './Today';
import Week from './Week';



class Overview extends React.Component {
    
 
    render() {
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
