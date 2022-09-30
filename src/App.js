import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import React, { useState } from "react";
import Register from './pages/Register';
import Welcome from './pages/Welcome';

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Routes>
            <Route exact path='/'  element={<Welcome />}>HI</Route>
            <Route exact path='/register' element={<Register />}></Route>
          </Routes>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
