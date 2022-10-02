import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState } from "react";
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Login from './pages/Login';

export const CredentialsContext = React.createContext();

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const credentialsState = useState(user);

  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Routes>
            <Route exact path='/' element={<Welcome  />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
          </Routes>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
