import React from 'react';
import { createNewUser } from '../services/users'


class Signup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            SignUpForm: {
                name:'',
                email: '',
                password: '',
                passwordcheck: '',
                location: '',
                household: 0
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

    async handleNewUserSubmit(name, handle, password, location, household) {
        await createNewUser(name, handle, password, location, household);
    }

    async checkPass(event) {
        const { history } = this.props;
        const { name, email, password, passwordcheck, location, household} = this.state.SignUpForm;

        event.preventDefault();
        if (!name || !email || !password || !passwordcheck || !location) {
            throw new Error ('Input missing');
        }

        if(password !== passwordcheck) {
            throw new Error ('Passwords do not match')
            }

        await this.handleNewUserSubmit(name, email, password, location, household);
        history.push('/account')
    }


       render() {
        return (
            <>
            <h1>Sign up</h1>
            <form>
                <div>
            <label>Full name:
                <input type="text" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "name")}></input>
            </label>
            </div>
            <div>
            <label>Email:
                <input type="text" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "email")}></input>
            </label>
            </div>
            <div>
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
            <label>Location:
                <input type="text" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "location")}></input>
            </label>
            </div>
            <div>
            <label>People in household:
                <input type="number" min="1" max="6" placeholder="1" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "household")}></input>
            </label>
            </div>
            <button onClick={this.checkPass.bind(this)}>Sign up</button>
            </form></>
        )
    }
}

export default Signup;

