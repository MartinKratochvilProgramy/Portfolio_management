import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); 
  const [, setCredentials] = useContext(CredentialsContext);

  const navigate  = useNavigate();

  const handleErrors = async (response) => {
    if (!response.ok) {
      const {message} = await response.json();
      throw Error(message);
    } else {
      return response;
    }
  }

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
    .catch((error) => {
      setError(error.message)
    })
  };

  return (
    <div>
      <h1>Register</h1>
      {/* if error, print error */}
      {!!error && (<span className='error-message'>{error}</span>)}
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
    </div>
  )
}
