import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import './Register.css';

import { handleErrors } from './Login';

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); 
  const [, setCredentials] = useContext(CredentialsContext);

  const navigate  = useNavigate();

  // use state vars to make http request
  const register = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, 
        password,
      })
    })
    .then(handleErrors)
    .then(() => {
      setCredentials({
        username,
        password
      })
      navigate("/"); //deprec history.push()
    })
    .then(localStorage.setItem('user', JSON.stringify({
      username,
      password
    })))
    .catch((error) => {
      setError(error.message)
    })
  };

  return (
    <div>
      <h1>Register</h1>
      {error && (<span className='error-message'>{error}</span>)}
      <form onSubmit={register}>
        <input
            onChange={(e) => setUsername(e.target.value)} 
            type="text" 
            placeholder='username'/>
        <br />
        <input
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder='password'/>
        <br />
        <button type='submit'>Register</button>
      </form>
      <Link to="/">Home</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  )
}
