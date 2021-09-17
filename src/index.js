const debounce = require('lodash.debounce');

import countriesTemplate from './templates/countries.hbs';
import countryTemplate from './templates/country.hbs';
import fetchCountries from './js/fetchCountries';
import refs from './js/refs';

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value;

  searchQuery &&
    fetchCountries(searchQuery).then(appendCountriesMarkup).catch(onFetchError);
}

function appendCountriesMarkup(countries) {
  const countriesCount = countries.length;

  if (countriesCount === 1) {
    refs.container.innerHTML = countryTemplate(countries);
  }

  if (countriesCount > 1 && countriesCount < 10) {
    refs.container.innerHTML = countriesTemplate(countries);
  }

  if (countriesCount >= 10) {
    clearCountriesContainer();
    onFetchError();
  }
}

function clearCountriesContainer() {
  refs.container.innerHTML = '';
}

function onFetchError(error) {
  alert('Упс, что-то пошло не так!');
}
