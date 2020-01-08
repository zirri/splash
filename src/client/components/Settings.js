import React from 'react';

import Header from './Header';


class Settings extends React.Component {
    render() {
        
        return (
            <div>
                <Header />
                Settings
                <p>Account</p>
                <p>Notifications</p>
                <p>Help</p>
            </div>
        )
    }
}

export default Settings