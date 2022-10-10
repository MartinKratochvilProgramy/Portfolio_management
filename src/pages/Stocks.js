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

      <button
          type="submit"
          onClick={update}
          className="px-7 py-3 text-white bg-blue-600 font-medium text-sm leading-snug uppercase rounded whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Update
      </button>
    </div>
  )
}
