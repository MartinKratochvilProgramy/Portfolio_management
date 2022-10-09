import React, { useState, useContext, useEffect } from 'react';
import { CredentialsContext } from '../App';
import StockInput from './StockInput';
import StocksDisplay from './StocksDisplay';

export default function Stocks() {
    const [stocks, setStocks] = useState([])
    const [credentials, ] = useContext(CredentialsContext);

    useEffect(() => {
        // get stocks on load
        fetch(`http://localhost:4000/stocks`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${credentials.username}:${credentials.password}`,
          },
          })
          .then((response ) => response.json())
          .then((stocks) => setStocks(stocks));
    
      }, [credentials]);

  return (
    <div>
      <StockInput setStocks={setStocks}/>
      <StocksDisplay stocks={stocks} setStocks={setStocks}/>
    </div>
  )
}
