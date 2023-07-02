import axios from 'axios';
export default axios;

/*-------------------------------------------------------------------------------------------------------------------------------- */
const urlBreeds = `https://api.thecatapi.com/v1/breeds`;
const ulrImage = `https://api.thecatapi.com/v1/images/`;
/*-------------------------------------------------------------------------------------------------------------------------------- */
//let axios = null;
/*-------------------------------------------------------------------------------------------------------------------------------- */
export function init(api_key) {
  axios = require('axios').default;
  axios.defaults.headers.common['x-api-key'] = api_key;
}
export function fetchBreeds() {
  return axios
    .get(urlBreeds)
    .then(response => response.data)
    .catch(error => {
      console.error('Błąd podczas pobierania ras:', error);
      throw error;
    });
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`${ulrImage}${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Błąd podczas pobierania ras:', error);
      throw error;
    });
}
/*-------------------------------------------------------------------------------------------------------------------------------- */
