import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../App';
import { handleErrors } from '../pages/Login';

export default function StockInput() {
  const [stockTicker, setStockTicker] = useState('');
  const [stockAmount, setStockAmount] = useState(0);
  const [error, setError] = useState(false); 
  const [credentials, setCredentials] = useContext(CredentialsContext);
  
  const persist = (newStocks) => {
    // hit the endpoint and write to db
    fetch(`http://localhost:4000/stocks`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials.username}:${credentials.password}`
      },
      body: JSON.stringify({
        newStocks, 
      })
    })
    .then(handleErrors)
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
    if (stockAmount === 0) {
      const amountInput = document.getElementById('amount-input');
      amountInput.classList.add('border-solid')
      amountInput.classList.add('border-red-400')
      amountInput.classList.add('border-[1px]')
      return;
    }
    const newStocks = {ticker: stockTicker, amount: stockAmount};
    persist(newStocks);

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
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full pl-4 p-2.5" 
                placeholder="Add new stocks..." 
                required="" 
                onChange={onTickerInputChange} 
                value={stockTicker}
              />
              <input 
                type="number" 
                id="amount-input" 
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full pl-4 p-2.5" 
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
