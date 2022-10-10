import React, { useContext, useEffect } from 'react'
import Stock from './Stock';
import { CredentialsContext } from '../App';

export default function Stocks({ stocks, setStocks }) {

  const [credentials, ] = useContext(CredentialsContext);
  

  const persist = (stockToDelete) => {
    // hit the endpoint and write to db



    fetch(`http://localhost:4000/stock_remove`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials.username}:${credentials.password}`
      },
      body: JSON.stringify({
        stockToDelete, 
      })
    })
    .then((response ) => response.json())
    .then((returnedStocks) => {
      if (stockToDelete.amount === 0) {
        console.log("returned: ", returnedStocks);
        console.log(stockToDelete);
        const newStocks = returnedStocks.filter((stock) => stock.ticker =! stockToDelete.ticker)
        console.log("new: ", newStocks);
        //setStocks(newStocks);
      } else {
        console.log("returned: ", returnedStocks);
        setStocks(returnedStocks);
      }
    })
  };

  function deleteStock(ticker, newAmount) {
    const stockToDelete = {ticker: ticker, amount: newAmount};
    persist(stockToDelete);
  }

  return (
    <div className="md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 m-auto">
      <div id='stocks-output'>
        {stocks.map((stock) => {
          return (
              <Stock 
                stock={stock} 
                key={stock.ticker} 
                deleteStock={deleteStock}
                />
          )
        })}
      </div>
  </div>
  )
}
