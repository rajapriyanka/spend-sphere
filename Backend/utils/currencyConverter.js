// currencyConverter.js
// Optional: can replace with real FX API later

const rates = {
  USD: 1,
  INR: 82,
  EUR: 0.92,
  GBP: 0.81
};

function convert(amount, fromCurrency, toCurrency) {
  if (!rates[fromCurrency] || !rates[toCurrency]) {
    throw new Error('Unsupported currency');
  }
  const amountInUSD = amount / rates[fromCurrency];
  return +(amountInUSD * rates[toCurrency]).toFixed(2);
}

module.exports = convert;
