import axios from 'axios';

const apiKey =
  'live_uydawoXNcsbhNr1l3Wr17wQRTjPk0cbXD4R0FV4LCAlvcXjaOkzgNL4dllAafpHf';
axios.defaults.headers.common['x-api-key'] = apiKey;



export const fetchBreeds = () => {
  return new Promise((resolve, reject) => {
    axios.get("https://api.thecatapi.com/v1/breeds")
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

export const fetchCatByBreed = (breedId) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};