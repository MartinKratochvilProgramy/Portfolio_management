import React, { useState, useContext } from 'react'
import { CredentialsContext } from '../App';
import { handleErrors } from '../pages/Login';

export default function StockInput({ stocks, setStocks }) {
  const [stockTicker, setStockTicker] = useState('');
  const [stockAmount, setStockAmount] = useState(0);
  const [error, setError] = useState(false); 
  const [credentials, ] = useContext(CredentialsContext);
  
  const persist = (newStock) => {
    // hit the endpoint and write to db
    // returns the new stocks
    fetch(`http://localhost:4000/stock_add`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials.username}:${credentials.password}`
      },
      body: JSON.stringify({
        newStock, 
      })
    })
    .then(handleErrors)
    .then((response ) => response.json())
    .then((returnedStocks) => setStocks(returnedStocks))
    .catch((error) => {
      setError(error.message)
    })
  };

  const addStock = (e) => {
    e.preventDefault();
    
    if (stockTicker === '') {
      const tickerInput = document.getElementById('ticker-input');
      tickerInput.classList.add('border-red-400')
      tickerInput.classList.remove('border-gray-300')
      return;
    }
    if (stockAmount <= 0) {
      const amountInput = document.getElementById('amount-input');
      amountInput.classList.add('border-red-400')
      amountInput.classList.remove('border-gray-300')
      return;
    }
    const newStock = {ticker: stockTicker, amount: stockAmount};
    persist(newStock);

    setStockTicker('');
    setStockAmount(0);
  }

  const onTickerInputChange = (e) => {
    e.target.classList.remove('border-red-400')
    e.target.classList.add('border-gray-300')
    setStockTicker(e.target.value)
  }

  const onAmountInputChange = (e) => {
    e.target.classList.remove('border-red-400')
    e.target.classList.add('border-gray-300')
    setStockAmount(e.target.value)
  }

  return (
    <div className="md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 m-auto">

      <form 
        onSubmit={addStock} 
        className="flex flex-col space-y-4 items-center">   
          <label htmlFor ="add-stock" className="sr-only">Add stock</label>
          <div className="relative flex flex-row w-full h-full">
              <input 
                type="text" 
                id="ticker-input" 
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:outline-none block w-full pl-4 p-2.5" 
                placeholder="Add new stocks..." 
                required="" 
                onChange={onTickerInputChange} 
                value={stockTicker}
                />
              <input 
                type="number" 
                id="amount-input" 
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:outline-none block w-full pl-4 p-2.5" 
                // className="border border-gray-300 p-2 my-2 outline-red-300 focus:outline-none" 
                placeholder="Amount..." 
                required="" 
                onChange={onAmountInputChange} 
                value={stockAmount}
              />
          </div>
          <button
              type="submit"
              className="flex flex-row px-7 py-3 text-white bg-blue-600 font-medium text-sm leading-snug uppercase rounded whitespace-nowrap shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Add stocks
          </button>
      </form>

      {error && (<span className='font-semibold text-xl text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>{error}<br /></span>)}

  </div>
  )
}
