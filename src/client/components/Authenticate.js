import React from 'react'
import { checkSession } from '../services/session';
import Errorview from './Errorview.js';

class Authenticate extends React.Component {
  constructor(props){
    super(props)

    this.state = {error: null}
  }
  async componentDidMount() {
    try{
      const { history } = this.props;
      const isAuthenticated = await checkSession();

      if (!isAuthenticated) {
        history.replace('/login')
      } else {
        history.replace('/home')
      }
    }catch(error){
      this.setState({error})
    }
    
  }
  render() {
    const { error } = this.state;
    if(error){
      return <Errorview error={error}/>
    }
    return <main>Authenticating...</main>;
  }
}

export default Authenticate