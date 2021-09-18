const BASE_URL = 'https://restcountries.eu/rest/v2';
const endpoint = '/name';
const filter = '?fields=name;capital;population;languages;flag';

export default searchQuery =>
  fetch(`${BASE_URL}${endpoint}/${searchQuery}${filter}`).then(res => res.json());
