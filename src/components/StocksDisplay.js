import React, {  useContext } from 'react'
import Stock from './Stock';
import { CredentialsContext } from '../App';

export default function Stocks({ stocks, setStocks }) {

  const [credentials, ] = useContext(CredentialsContext);

  const persist = (stockToDelete) => {
    // hit the endpoint and write to db
    fetch(`http://localhost:4000/stock_delete`, {
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
    .then((returnedStocks) => setStocks(returnedStocks))
  };

  function deleteStock(ticker, newAmount) {
    const stockToDelete = {ticker: ticker, amount: newAmount};
    
    persist(stockToDelete);
  }

  return (
    <div className="md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 m-auto">
      {stocks.map((stock) => {
        if (stock.amount === 0) return;
        return (
            <Stock 
              stock={stock} 
              key={stock.ticker} 
              deleteStock={deleteStock}
              />
        )
      })}
  </div>
  )
}
