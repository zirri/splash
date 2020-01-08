import React from 'react';

import Header from './Header';


class Settings extends React.Component {
    render() {
        
        return (
            <main>
                <Header />
                Settings
                <p>Account</p>
                <p>Notifications</p>
                <p>Help</p>
            </main>
        )
    }
}

export default Settings