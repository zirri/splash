import React from 'react';
import { createUser } from '../services/users'


class Signup extends React.Component {
    constructor(props) {
        super(props);

        
        this.state = {
            SignUpForm: {
                name:'',
                email: '',
                password: '',
                passwordcheck: '',
            }
        }
    }

    handleInputChange(field, event) {
        this.setState({
            SignUpForm: {
                ...this.state.SignUpForm,
                [field]: event.target.value,
            }
        })
    }
    async checkPass(event) {
        const { history } = this.props;
        const { name, email, password, passwordcheck} = this.state.SignUpForm;

        event.preventDefault();
        if (!name || !email || !password || !passwordcheck) {
            throw new Error ('Input missing');
        }

        if(password !== passwordcheck) {
            throw new Error ('Passwords do not match')
            }

        await this.handleNewUserSubmit(name, email, password);
        history.push('/')
    }


       render() {
        return (
            <div><h1>Sign up</h1>
            <form>
                <div>
            <label>Full name:
                <input type="text" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "name")}></input>
            </label>
            </div>
            <div>
            <label>Email:
                <input type="text" value={this.state.SignUpForm.value} onChange={this.emailInputChange.bind(this, "email")}></input>
            </label>
            </div>
            <div>
            <label>Password:
                <input type="text" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "password")}></input>
            </label>
            </div>
            <div>
            <label>Confirm password:
                <input type="text" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "passwordcheck")}></input>
            </label>
            </div>
            <button onClick={this.checkPass.bind(this)}>Sign up</button>
            </form></div>
        )
    }
}

export default Signup;

