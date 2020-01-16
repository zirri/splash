//Plugins
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

//Bootstrap components
import { Form, Button, Col } from 'react-bootstrap';

//Locale files
import { createNewUser } from '../services/users';
import { createSession } from '../services/session';
import Errorview from './Errorview';

const schema = yup.object({
  name: yup.string().min(2, 'Name must be more than one character').required(),
  email: yup.string().email('Please enter a valid email address').required(),
  password: yup.string().min(6, 'Password too short (must consist of 6 characters)').required(),
  passwordcheck: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
  location: yup.string().required(),
  household: yup.number().min(1, 'Household must consist of at least one person').required(),
});

class Signup extends React.Component {
  constructor(props){
    super(props)

    this.state= {
      error: null
    }
  }
  render() {
    const { error } = this.state;
    const { history } = this.props;

    if(error){
      return <Errorview error={error}/>
    }

    return (
      <main>
        <h1 className="animated">splash</h1>
        <Formik
          validationSchema={schema}

          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordcheck: '',
            location: '',
            household: 1,
          }}
          onSubmit={async (values) => {
            try{
              const newUser = await createNewUser(values.name, values.email, values.password, values.location, values.household);
              const { token, error } = await createSession({email:values.email, password:values.password} );
              if(error||newUser.error){throw new Error(error)}
              localStorage.setItem('json_web_token', token);
              history.push('/');
            }catch(error){
              this.setState({error})
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
          }) => (

              <Form noValidate onSubmit={handleSubmit} className="container">
                <h2>Sign up</h2>
                <br />
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>full name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
                      placeholder="Name Nameson"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && !!errors.email}
                      placeholder="email@email.com"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                    <Form.Label>password</Form.Label>

                    <Form.Control
                      type="password"
                      placeholder="password"
                      aria-describedby="inputGroupPrepend"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>

                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormik03">
                    <Form.Label>confirm password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="confirm password"
                      name="passwordcheck"
                      value={values.passwordcheck}
                      onChange={handleChange}
                      isInvalid={touched.passwordcheck && !!errors.passwordcheck}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.passwordcheck}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormik04">
                    <Form.Label>location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="location"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      isInvalid={touched.location && !!errors.location}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.location}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="1" controlId="validationFormik05">
                    <Form.Label>household</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="number of people"
                      name="household"
                      value={values.household}
                      onChange={handleChange}
                      isInvalid={touched.household && !!errors.household}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.household}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Button type="submit">Sign up</Button>
              </Form>
            )}
        </Formik>
      </main>

    );
  }
}


export default Signup;