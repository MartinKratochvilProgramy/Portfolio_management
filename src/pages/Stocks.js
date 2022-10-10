import React, { useState, useContext, useEffect } from 'react';
import { CredentialsContext } from '../App';
import { useNavigate  } from 'react-router-dom';
import StockInput from '../components/StockInput';
import StocksDisplay from '../components/StocksDisplay';
import Navbar from '../components/Navbar';
import { handleErrors } from './Login';

export default function Stocks() {
  const [stocks, setStocks] = useState([])
  const [credentials, setCredentials] = useContext(CredentialsContext);

  const navigate = useNavigate();

  function logout() {
    setCredentials(null);
    localStorage.setItem('user', null)
    navigate("/");
  }

  useEffect(() => {
      // get stocks on load
      fetch(`http://localhost:4000/stocks`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
        })
        .then(handleErrors)
        .then((response ) => response.json())
        .then((stocks) => setStocks(stocks))
        .catch((error) => {
          console.log(error);
        })
  
    }, [credentials]);

  function update () {
    fetch(`http://localhost:4000/update`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
    .then(handleErrors)
    .then((response ) => response.json())
    .then((stocks) => {
      setStocks(stocks);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div>
      <Navbar active={"stocks"} logout={logout}/>
      <StockInput setStocks={setStocks}/>
      <StocksDisplay stocks={stocks} setStocks={setStocks}/>
    </div>
  )
}
