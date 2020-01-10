import React from 'react';

class Logout extends React.Component {
    componentDidMount() {
        const { history } = this.props;
        localStorage.removeItem('json_web_token');
        history.replace('/');
    }
    render(){
        return(
            <div><h1>Logging out...</h1></div>
        )
    }
}

export default Logout