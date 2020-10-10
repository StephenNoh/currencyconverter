import React, { useEffect, useState } from 'react';
import CurrencyRow from "./CurrencyRow";
import './App.css';


const API_URL = "https://api.exchangeratesapi.io/latest"

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [exchangeRate, setExchangeRate] = useState()

  let toAmount, fromAmount

  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setToCurrency(firstCurrency)
        setFromCurrency(data.base)
        setExchangeRate(data.rates[firstCurrency])
      
      
      })
  }, [])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
    fetch(`${API_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [toCurrency, fromCurrency])
  return (
    <div className="App">
      <h1>Built with React useState / useEffect hooks and API calls.</h1>
      <p>Based on <a href="https://www.youtube.com/watch?v=XN5elYWiSuw&ab_channel=WebDevSimplified" target="_blank">this web tutorial</a>. </p>
      <p><a href="https://github.com/StephenNoh/currencyconverter" target="_blank">See code here:</a></p>
      <hr/>
      <h1>Convert your currency:</h1>
      <CurrencyRow 
        currencyOptions= {currencyOptions}
        selectedCurrency = {fromCurrency}
        onChangeCurrency = {e => setFromCurrency(e.target.value)}
        onChangeAmount = {handleFromAmountChange}
        amount = {fromAmount}
        />
      <div>=</div>
      <CurrencyRow 
        currencyOptions ={ currencyOptions}
        selectedCurrency = {toCurrency}
        onChangeCurrency = {e => setToCurrency(e.target.value)}
        onChangeAmount = {handleToAmountChange}
        amount = {toAmount}
        />

    </div>
  );
}

export default App;
