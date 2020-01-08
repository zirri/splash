import React from 'react';
import { createNewUser } from '../services/users'
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";


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
        history.push('/login')
    }


       render() {
        return (
            <>
            <h1>Sign up</h1>
            <Form>
                <Form.Group controlId="name">
            <Form.Label>Full name:
                <Form.Control type="text" placeholder="enter full name" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "name")} />
            </Form.Label>
            </Form.Group>
            <Form.Group controlId="email">
            <Form.Label>Email:
                <Form.Control type="text" placeholder="enter email" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "email")}/>
            </Form.Label>
            </Form.Group>
            <Form.Group controlId="password">
            <Form.Label>Password:
                <Form.Control type="password" placeholder="enter password" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "password")}/>
            </Form.Label>
            </Form.Group>
            <Form.Group controlId="confirmpassword">
            <Form.Label>Confirm password:
                <Form.Control type="password" placeholder="repeat password" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "passwordcheck")}/>
            </Form.Label>
            </Form.Group>
            <Form.Group controlId="location">
            <Form.Label>Location:
                <Form.Control type="text" placeholder="enter location" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "location")}/>
            </Form.Label>
            </Form.Group>
            <Form.Group controlId="household">
            <Form.Label>People in household:
                <Form.Control as="select" value={this.state.SignUpForm.value} onChange={this.handleInputChange.bind(this, "household")}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Form.Control>
            </Form.Label>
            </Form.Group>
            <Button onClick={this.checkPass.bind(this)}>Sign up</Button>
            </Form></>
        )
    }
}

export default Signup;

