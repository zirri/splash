import React from 'react';
import jwtDecode from 'jwt-decode';


class Authentication extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isAuthenticated: false,
      };
    }
  
    checkAuth() {
        const { history } = this.props;
        const token = localStorage.getItem('json_web_token');
        let isValidToken;
        try{
            const payload = jwtDecode.decode(token);
            console.log(payload);
            isValidToken = true;
        }catch(error){
            isValidToken = false;
        }
  
        if (!isValidToken) {
            history.replace('/login');
        } else {
            this.setState({
            isAuthenticated: true,
            });
        }
        }
  
    componentDidMount() {
      this.checkAuth();
    }
  
    componentDidUpdate() {
      this.checkAuth();
    }
  
    render() {
      const { isAuthenticated } = this.state;
      const { children } = this.props;
      return isAuthenticated ? children : <div>Authenticating...</div>;
    }
  }

export default Authentication;
