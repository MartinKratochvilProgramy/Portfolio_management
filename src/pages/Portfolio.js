import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../App';
import { useNavigate  } from 'react-router-dom';
import StockInput from '../components/StockInput';
import StocksDisplay from '../components/StocksDisplay';

export default function Portfolio() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [stocks, setStocks] = useState([])
  
  const navigate = useNavigate();

  function logout() {
    setCredentials(null);
    localStorage.setItem('user', null)
    navigate("/");
  }

  useEffect(() => {
    // send user home if not loged in
    if (!credentials) {
      navigate("/");
      return;
    };

    fetch(`http://localhost:4000/stocks`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      })
      .then((response ) => response.json())
      .then((stocks) => setStocks(stocks));

  }, [credentials, navigate]);
  

  return (
    <div className="">
      <StockInput stocks={stocks} setStocks={setStocks}/>
      <StocksDisplay stocks={stocks} setStocks={setStocks}/>
      
       <button
        type="submit"
        className="fixed top-4 md:bottom-auto right-4 flex flex-row px-7 py-3 text-blue-600 border-solid border-blue-600 border-[1px] bg-white font-medium text-sm leading-snug uppercase rounded whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={logout}
      >
        Logout
      </button>
  </div>
  )
}
