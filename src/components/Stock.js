import React from "react"

export default function Stock({ stock, deleteStock }) {
    // function handleToggleClick() {
    //     toggleComplete(todo._id);
    // }

    // function handleDeleteClick() {
    //   deleteTodo(todo._id);
    // }

  return (
    <div className={"border-blue-600 border-solid border-[1px] rounded my-4"}>
      <div className="flex flex-row items-center px-4 py-3 my-0 text-black font-medium text-sm leading-snug uppercase hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">

        <div className="w-full h-full text-justify flex items-start mx-3  ">
          <div className="w-16">{stock.ticker}</div>
          <div>{stock.amount}</div>
        </div>
        <button className="rounded-full p-1 transition duration-150 hover:bg-red-100 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  )
}
