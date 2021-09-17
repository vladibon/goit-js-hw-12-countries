import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import debounce from 'lodash.debounce';

import countriesTemplate from './templates/countries.hbs';
import countryTemplate from './templates/country.hbs';

import fetchCountries from './js/fetchCountries';
import refs from './js/refs';

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value.trim();

  if (!searchQuery) {
    clearCountriesContainer();
    return;
  }

  fetchCountries(searchQuery)
    .then(countries => {
      const countriesCount = countries.length;
      const message = countries.message;

      // console.log(countries, countriesCount, message);

      if (message) onError(message);
      if (countriesCount > 10)
        onError(`${countriesCount} matches found. Please enter a more specific query!`);

      if (countriesCount > 1 && countriesCount <= 10) appendCountriesMarkup(countries);
      if (countriesCount === 1) appendCountryMarkup(...countries);
    })
    .catch(onError);
}

function appendCountriesMarkup(countries) {
  refs.container.innerHTML = countriesTemplate(countries);
}

function appendCountryMarkup(country) {
  refs.container.innerHTML = countryTemplate(country);
}

function clearCountriesContainer() {
  refs.container.innerHTML = '';
}

function onError(message) {
  clearCountriesContainer();

  error({
    text: message,
    delay: 1000,
    sticker: false,
    closer: false,
  });
}
