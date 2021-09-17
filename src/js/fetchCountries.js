const BASE_URL = 'https://restcountries.eu/rest/v2';
const endpoint = '/name';
const filter = '?fields=name;capital;population;languages;flag';

export default function fetchCountries(searchQuery) {
  const url = `${BASE_URL}${endpoint}/${searchQuery}${filter}`;

  return fetch(url).then(res => res.json());
}
