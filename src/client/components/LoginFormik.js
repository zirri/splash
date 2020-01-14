//PLUGINS
import React from 'react';
import { Link } from 'react-router-dom'
import { Formik } from 'formik';
import * as yup from 'yup';

//BOOTSTRAP COMPONENTS
import { Form, Button, Col } from 'react-bootstrap';


//LOCALE IMPORTS
import { createSession } from '../services/session';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6, 'Password too short (must consist of 6 characters)').required(),
});

class LoginFormik extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      error: null
    }
  }
  

  render() {
    return (
      <main>
        <h1 className="animated">splash</h1>
        <Formik
          validationSchema={schema}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async ({ email, password }) => {
            try {
              const { history } = this.props;
              const { token } = await createSession({ email, password })
              localStorage.setItem('json_web_token', token)
              history.push('/home')
            } catch (error) {
              this.setState({
                error
              })
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            isValid,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit} className="container">
              <h1>Login</h1>
              <br />
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationFormikEmail">
                  <Form.Label>email</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>

                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                  <Form.Label>password</Form.Label>
                  
                  <Form.Control
                    type="password"
                    placeholder="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button type="submit">Log in</Button>
            </Form>)}
        </Formik>
        <Link to='/signup'>Sign up</Link>
      </main>
    )
  }
}

export default LoginFormik;