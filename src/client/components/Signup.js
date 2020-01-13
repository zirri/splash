import React from 'react';
import { createNewUser } from '../services/users';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Col } from 'react-bootstrap';

const schema = yup.object({
    name: yup.string().min(2, 'Name must be more than one character').required(),
    email: yup.string().email('Please enter a valid email address').required(),
    password: yup.string().min(6, 'Password too short (must consist of 6 characters)').required(),
    passwordcheck: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
    location: yup.string().required(),
    household: yup.number().min(1, 'Household must consist of at least one person').required(),
  });
  
class Signup extends React.Component {
      render() {
    return (
        <main>
           <h1 className="animated">splash</h1>
              
      <Formik
        validationSchema={schema}
        
        initialValues={{
                name:'',
                email: '',
                password: '',
                passwordcheck: '',
                location: '',
                household: 0,
        }}
        onSubmit={async (values) => {
            await createNewUser(values.name, values.email, values.password, values.location, values.household);
            const { history } = this.props;
            history.push('/login');
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
              <h1>Sign up</h1>
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
                  isInvalid={!!errors.name}
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
                  isInvalid={!!errors.email}
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
                    isInvalid={!!errors.password}
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
                  isInvalid={!!errors.passwordcheck}
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
                  isInvalid={!!errors.location}
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
                  isInvalid={!!errors.household}
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