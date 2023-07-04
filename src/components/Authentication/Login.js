import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Posts from '../Posts/Posts';

function Login(props) {
  let existingData = JSON.parse(localStorage.getItem('User')) || [];
  const [User , setUser] = useState({email: '',password});
  const navigate = useNavigate();
  
  
  const handleLogin = () =>{
   fetch('http://127.0.0.1:5000/api/login'),{
    method : 'POST',
    body: JSON.stringify()
   }
  }


  return (
    <div>
      <div className='login'>
        <form>
        <label>
          Email:
        </label>
        <input  type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email'></input>
        <br/>
        <label>Password:</label>
        <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your password'></input>
        <button type='submit' onClick={handleLogin}>Login</button>
        </form>
       
      </div>
    </div>
  );
}

export default Login;
