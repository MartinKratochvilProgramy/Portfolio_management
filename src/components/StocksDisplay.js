import React, { useState, useContext, useEffect } from 'react'
import Stock from './Stock';
import { CredentialsContext } from '../App';

export default function Stocks({ stocks, setStocks }) {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalValue, setDeleteModalValue] = useState(null);
  const [credentials, setCredentials] = useContext(CredentialsContext);

  function displayModal(e) {
    setShowDeleteModal(true);
    setDeleteModalValue(e.currentTarget.id);
  }

  const persist = (newStocks) => {
    // hit the endpoint and write to db
    fetch(`http://localhost:4000/stocks_delete`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials.username}:${credentials.password}`
      },
      body: JSON.stringify({
        newStocks, 
      })
    })
  };

  function deleteStock(ticker, newAmount) {
    var newStocks = stocks;
    if (newAmount === 0) {
      // remove stock
      newStocks = newStocks.filter(stock => {return stock.ticker !== ticker})
    } else {
      newStocks.map(stock => {
        if (stock.ticker === ticker) {
          stock.amount = newAmount;
        }
      });
    }
    
    setStocks(newStocks);
    persist(newStocks);
  }

  return (
    <div className="md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 m-auto">
      {stocks.map((stock) => {
        if (stock.amount === 0) return;
        return (
            <Stock 
              stock={stock} 
              key={stock.ticker} 
              displayModal={displayModal}
              deleteStock={deleteStock}
              />
        )
      })}
      {/* {showDeleteModal ? <DeleteStockModal setShowDeleteModal={setShowDeleteModal} deleteModalValue={deleteModalValue} deleteStock={deleteStock}/> : null} */}
  </div>
  )
}
