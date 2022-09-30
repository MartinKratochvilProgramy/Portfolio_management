import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { CredentialsContext } from '../App';

export default function Welcome() {
  const [credentials] = useContext(CredentialsContext);
  return (
    <div>
      <h1>Welcome {credentials && credentials.username}</h1>  
      {!credentials && <Link to="/register">Register</Link>}
      <br />
      {!credentials && <Link to="/login">Login</Link>}
    </div>
  )
}
