// export default function fetchCountries(searchQuery) {
//   return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(response => {
//     return response.json();
//   });
// }

export default function fetchCountries(searchQuery) {
  return fetch('https://restcountries.eu/rest/v2/name/' + searchQuery, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(r => r.json())
    .then(data => data)
    .catch(error => console.warn(error));
}
