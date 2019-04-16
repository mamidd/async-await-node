const axios = require('axios');

const exchangeAPI = "http://data.fixer.io/api/latest?access_key=244ffa02e23f6e85aac36e368838304f";
const countriesAPI = "https://restcountries.eu/rest/v2/currency/";

const getExchangeRate = async (from, to) => {
  let response = await axios.get(exchangeAPI);
  let rate = response.data.rates[to] / response.data.rates[from];
  return rate;
};

const getCountries = async (currencyCode) => {
  let response = await axios.get(`${countriesAPI}${currencyCode}`);
  return response.data.map((country) => country.name);
};

getExchangeRate('USD', 'CAD').then( (rate) => {
  console.log(rate);
});

getCountries('EUR').then( (countries) => {
  console.log(countries);
});
