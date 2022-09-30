import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';

export const handleErrors = async (response) => {
  // throws error when response not OK
  if (!response.ok) {
    const {message} = await response.json();
    throw Error(message);
  } else {
    return response;
  }
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); 
  const [, setCredentials] = useContext(CredentialsContext);

  const navigate  = useNavigate();


  // use state vars to make http request
  const login = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/login`, {
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
      <h1>Login</h1>
      {error && (<span className='error-message'>{error}</span>)}
      <form onSubmit={login}>
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
        <button type='submit'>Login</button>
      </form>
      <Link to="/">Home</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  )
}
