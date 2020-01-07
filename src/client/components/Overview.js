import React from 'react';
import Today from './Today'




//TODO: Create Today and Week and add into overview

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

export default Overview
