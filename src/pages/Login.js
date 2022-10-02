import React, { useState, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
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
    .then(localStorage.setItem('user', JSON.stringify({
      username,
      password
    })))
    .catch((error) => {
      setError(error.message)
    })
  };
  
  const navigate  = useNavigate();

  return (
    <div>
      <h1>Login</h1>
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
      {error && (<span className='error-message'>{error}<br /></span>)}
      <Link to="/">Home</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  )
}
