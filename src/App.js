import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState } from "react";
import Register from './pages/Register';
import Login from './pages/Login';
import Stocks from './pages/Stocks';
import Charts from './pages/Charts';

export const CredentialsContext = React.createContext();

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const credentialsState = useState(user);

  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Routes>
            <Route exact path='/' element={<Login  />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/stocks' element={<Stocks />}></Route>
            <Route exact path='/charts' element={<Charts />}></Route>
          </Routes> 
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
