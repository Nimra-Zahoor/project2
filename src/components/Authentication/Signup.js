import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Signup.css'
import Login from './Login';

function Signup(props) {
  const navigate = useNavigate();

  const User = props.user;
  const [NewUser, setNewUser] = useState({id: User.id++})
 
  console.log("USer",User)
  const handleSubmit = (values) => {
    User.id = values.id ;
    User.name = values.name;
    User.email = values.email;
    User.password = values.password;
    
    let existingData = JSON.parse(localStorage.getItem('User')) || [];
    let emailExists = existingData.some(function (user) {
      return user.email === values.email;
    });

    if (emailExists) {
      alert('Email Exists');
    } else {
     
      existingData.push(User);
      localStorage.setItem('User', JSON.stringify(existingData));
      setNewUser(User); 
      <Login/>
      navigate('/login');
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
     
      <Formik
        initialValues={{id:User.id, email: '', password: '', name: '' }}
        validate={(values) => {
          const errors = {};
          values.id = User.id++;
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)) {
            errors.password = 'Strong password 8 digit with a letter';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='form'>
            <label>Name: </label>
            <Field type="text" name="name" />
            <br />
            <label>Email: </label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" />
            <br />
            <label>Password: </label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" />
            <br />
            <button type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
