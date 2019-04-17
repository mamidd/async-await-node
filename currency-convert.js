const axios = require('axios');

const exchangeAPI = "http://data.fixer.io/api/latest?access_key=244ffa02e23f6e85aac36e368838304f";
const countriesAPI = "https://restcountries.eu/rest/v2/currency/";

const getExchangeRate = async (from, to) => {
  try{
    let response = await axios.get(exchangeAPI);
    let rate = response.data.rates[to] / response.data.rates[from];

    if(isNaN(rate)) {
      throw new Error();
    }

    return rate;
  }catch(e){
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async (currencyCode) => {
  try{
    let response = await axios.get(`${countriesAPI}${currencyCode}`);
    return response.data.map((country) => country.name);
  }catch(e){
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
};

const convertCurrency = async (from, to, amount) => {
  let rate = await getExchangeRate(from, to);
  let countries = await getCountries(to);
  let convertedAmount = (amount * rate).toFixed(2);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`
};

convertCurrency('USD', 'CAD', 20).then((message) => {
  console.log(message);
}).catch(err => {
  console.log(err.message);
})
