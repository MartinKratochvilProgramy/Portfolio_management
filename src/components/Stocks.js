import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../App';
import Stock from './Stock';

export default function Todos() {
    const [stocks, setStocks] = useState([])
    const [credentials, setCredentials] = useContext(CredentialsContext);

    useEffect(() => {
        // fetch stocks on load
        fetch(`http://localhost:4000/stocks`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
        })
        .then((response ) => response.json())
        .then((stocks) => setStocks(stocks));
    }, []);
  
    function logStocks() {
        console.log("logging");
        stocks.forEach(stock => console.log(stock.ticker))
    }

  return (
      <div className="md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 m-auto">
        <button onClick={logStocks}>log stocks</button>
      {stocks.map((stock) => {
        return (
          <Stock 
            stock={stock} 
            key={stock._id} 
            />
        )
      })}
  </div>
  )
}
