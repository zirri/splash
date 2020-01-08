import React from 'react';
import { createSession } from '../services/session'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

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
            const { token, error } = await createSession({ email, password });
            if (error) {
                throw new Error(error);
            }

            if (!token) {
                throw new Error('No token received, try again.');
            }
            
            localStorage.setItem('json_web_token', token)
            history.push('/home');
         
     } catch (error) {
         this.setState({ error, isLoggingIn: false });
     }
    }
    

    render() {
        const { error, isLoggingIn } = this.state;
        return (
           
            <div>
                <h1 className="animated">splash</h1>
                 <div>
                {isLoggingIn ? <Loader {...this.props} /> : 
            
            <Form>
            <Form.Group controlId="email">
                <Form.Label>
                    Email:
                    {/* <input 
                    type="text"
                    value = {this.state.loginForm.email}
                    onChange={this.handleInputChange.bind(this, "email")}
                    ></input> */}
                    <Form.Control type="email" placeholder="enter email" />
                </Form.Label>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>
                    Password:
                    {/* <input 
                    type="password"
                    value = {this.state.loginForm.password}
                    onChange={this.handleInputChange.bind(this, "password")}
                    ></input> */}
                    <Form.Control type="password" placeholder="enter password" />
                </Form.Label>
            </Form.Group>
                <Button onClick={this.handleLoginAttempt.bind(this)}>Login</Button>
                <br></br>
                <Link to='/signup'>Sign up</Link>
        </Form>
}
                {error && <p>Unable to log in: {error.message}</p>}
                </div>
            
            </div>
        )
    }
}

export default Login;
