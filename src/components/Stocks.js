import React, { useState } from 'react'
import Stock from './Stock';
import DeleteStockModal from './DeleteStockModal';

export default function Stocks({ stocks }) {

  const [deleteStockModal, setDeleteStockModal] = useState(false);


  return (
      <div className="md:px-12 px-2 pt-14 md:pt-1 lg:w-6/12 md:w-8/12 w-10/12 m-auto">
      {deleteStockModal ? <DeleteStockModal setDeleteStockModal={setDeleteStockModal}/> : null}
      {stocks.map((stock) => {
        return (
            <Stock 
              stock={stock} 
              key={stock.ticker} 
              setDeleteStockModal={setDeleteStockModal}
              />
        )
      })}
  </div>
  )
}
