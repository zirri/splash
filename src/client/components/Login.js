import React from 'react';
import { createSession } from '../services/session'
import { Link } from 'react-router-dom'
import Loader from './Loader'
// import { emailRegex } from 'email-regex';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginForm: {
                email: "",
                password: "",
            },
        }
    }

    handleInputChange(field, event) {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [field]: event.target.value,
            }
        })
    }

    async handleLoginAttempt(event) {
        event.preventDefault();

        const { history } = this.props;
        const { email, password } = this.state.loginForm;
    
        try { 
            this.setState({ isLoggingIn: true })
     

        //try to implement emailRegex({exact: true}).test(email);
         
     } catch (error) {
         this.setState({ error, isLoggingIn: false });
     }
    }
    

    render() {
        const { error, isLoggingIn } = this.state;
        return (
           
            <div>
                 <div>
                {isLoggingIn ? <Loader {...this.props} /> : <form>
            <div>
                <label>
                    Email:
                    <input 
                    type="text"
                    value = {this.state.loginForm.handle}
                    onChange={this.handleInputChange.bind(this, "email")}
                    ></input>
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input 
                    type="password"
                    value = {this.state.loginForm.password}
                    onChange={this.handleInputChange.bind(this, "password")}
                    ></input>
                </label>
            </div>
            <div>
                <button onClick={this.handleLoginAttempt.bind(this)}>Login</button>
                <br></br>
                <Link to='/signup'>Sign up</Link>
            </div>
        </form>
}
                {error && <p>Unable to log in: {error.message}</p>}
                </div>
            
            </div>
        )
    }
}

export default Login;
