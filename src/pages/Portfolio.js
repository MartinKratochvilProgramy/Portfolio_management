import React, { useContext, useState, useEffect } from 'react'
import { CredentialsContext } from '../App';
import { useNavigate  } from 'react-router-dom';
import Stocks from '../components/Stocks';
import Charts from '../components/Charts';

export default function Portfolio() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [display, setDisplay] = useState("home");
  
  const navigate = useNavigate();
  
    useEffect(() => {
      // send user home if not loged in
      if (!credentials) {
        navigate("/");
        return;
      };
  
    }, [credentials, navigate]);

    useEffect(() => {
      console.log(display);
    }, [display])

  function logout () {
    setCredentials(null);
    localStorage.setItem('user', null)
    navigate("/");
  }

  function displayHome () {
    setDisplay("home");
  }

  function displayStocks () {
    setDisplay("stocks");
  }
  

  return (
    <div className="">

      {display === "home" ? <Charts /> : null}
      {display === "stocks" ? <Stocks /> : null}

      
      <div className="fixed top-0 left-0 md:bottom-auto border-r-solid border-r-blue-600 border-r-[1px]">
       <button
        type="submit"
        className={"border-b-solid border-b-blue-600 border-b-[1px] flex w-full px-7 py-4 font-medium text-sm leading-snug uppercase whitespace-nowrap hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            + (display === "home" ? " bg-blue-700 text-white" : null)}
        onClick={displayHome}
      >
        Home
      </button>
       <button
        type="submit"
        className={"border-b-solid border-b-blue-600 border-b-[1px] flex w-full px-7 py-4 font-medium text-sm leading-snug uppercase whitespace-nowrap hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            + (display === "stocks" ? " bg-blue-700 text-white" : null)}        
        onClick={displayStocks}
      >
        Stocks
      </button>
       <button
        type="submit"
        className={"border-b-solid border-b-blue-600 border-b-[1px] flex w-full px-7 py-4 font-medium text-sm leading-snug uppercase whitespace-nowrap hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"}
        onClick={logout}
      >
        Logout
      </button>


        
      </div>
  </div>
  )
}
