import React from 'react';

function CurrencyRow(props) {
    const { currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount} = props
    return (
        <div>
            <input type="number" value={Math.round(amount * 100) / 100} onChange={onChangeAmount}/>
                <select value = {selectedCurrency} onChange={onChangeCurrency}>
                    {currencyOptions.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
        </div>
    )
}

export default CurrencyRow