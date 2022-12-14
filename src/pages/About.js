import React from 'react';

import Navbar from '../components/Navbar';

export default function About() {
  
    return (
    <div>
        <Navbar active={"about"}/>
        <div className='flex flex-col justify-center items-center space-y-16'>
            <h1 className='text-3xl font-semibold mt-8'>
                <span className='text-blue-600'>ADD</span> STOCKS AND <span className='text-blue-600'>MANAGE</span> YOUR PORTFOLIO
            </h1>
            <p className='max-w-[60%] text-xl'>
                Under the section <a href="/stocks" className='text-blue-600 underline underline-offset-4'>Stocks</a> add the stocks you have in your portfolio. Specify ticker and amount. App uses Yahoo Finance API, so in 
                order to add your stocks correctly, refer to <a href="https://finance.yahoo.com/" className='text-blue-600 underline underline-offset-4'>https://finance.yahoo.com/</a> and 
                search for corresponding tickers (eg. 'AAPL' or 'MSFT').
            </p>
            <p className='max-w-[60%] text-xl'>
                Every day the server looks for previous close price for each stock in your portfolio and updates current net-worth.
                Financials (net-worth history and pie chart of all your stocks) are displayed under the <a href="/charts" className='text-blue-600 underline underline-offset-4'>Charts</a> section.
            </p>
            <p className='max-w-[60%] text-xl'>
                To get a rough idea about how much you invest and what is your discipline when investing, refer to the <a href="/investments" className='text-blue-600 underline underline-offset-4'>Investments </a>
                section, where the amount of money you invested is displayed. 
            </p>
            <p className='max-w-[60%] text-xl'>
                This app is intended for the 'Bogglehead' type investor who likes to invest regularly over longer periods of time.
            </p>
            <p className='flex flex-row space-x-2 max-w-[60%] text-xl pt-24 pb-8'>
                <img 
                    className=''
                    src={require("../img/GitHub-Mark-32px.png")} 
                    alt="GitHub_logo"
                    />
                <a 
                    href="https://github.com/MartinKratochvilProgramy/Portfolio_management" 
                    className='text-blue-600 underline underline-offset-4'
                    target="_blank" 
                    rel="noopener noreferrer"
                    >
                    GitHub
                    </a>
            </p>
        </div>
    </div>
    )
}
