import debounce from 'lodash.debounce';
import { error, Stack } from '@pnotify/core';

import countriesTemplate from '../templates/countries.hbs';
import countryTemplate from '../templates/country.hbs';

import fetchCountries from './fetchCountries';
import refs from './refs';

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

      if (message) throw new Error(message);
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
    delay: Infinity,
    stack: new Stack({
      dir1: 'down',
      dir2: 'right',
      context: refs.container,
    }),
  });
}
