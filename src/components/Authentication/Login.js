import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Posts from '../Posts/Posts';
import { User, logged_in } from '../../globals';

function Login(props) {
  let existingData = JSON.parse(localStorage.getItem('User')) || [];
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const User = props.user;
  const navigate = useNavigate();
  const emailRef = useRef(); // Ref for email input
  const passwordRef = useRef(); // Ref for password input

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission

    console.log('I am working');
    console.log('Email', Email, 'Password', Password);

    for (let i in existingData) {
      if (existingData[i].email === Email && existingData[i].password === Password) {
        console.log('Login successfully');
        
        User.logged_in = true;
        navigate('/posts');
        return; // Exit the function after successful login
      }
    }

    console.log('Invalid Email or Password');
    alert('Invalid email or password');
    setEmail('');
    setPassword('');
    emailRef.current.focus(); // Set focus back to the email input
  };

  return (
    <div>
      <div className="login">
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input type="email" ref={emailRef} onChange={(e) => setEmail(e.target.value)} value={Email} placeholder="Enter Your Email" />
          <br />
          <label>Password:</label>
          <input type="password" ref={passwordRef} onChange={(e) => setPassword(e.target.value)} value={Password} placeholder="Enter Your password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
