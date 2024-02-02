import axios from 'axios';

import { fetchBreeds } from './cat-api';

import { fetchCatByBreed } from './cat-api';

const apiKey =
  'live_uydawoXNcsbhNr1l3Wr17wQRTjPk0cbXD4R0FV4LCAlvcXjaOkzgNL4dllAafpHf';
axios.defaults.headers.common['x-api-key'] = apiKey;

const catInfoDiv = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.value;
      option.text = breed.label;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error loading breeds:', error);
  });

breedSelect.addEventListener('change', () => {
  // obtin valoarea pe care o selectez
  const selectedBreedId = breedSelect.value;

  // apelez functia  pentru a obtine informații despre pisică
  fetchCatByBreed(selectedBreedId)
    .then(catInfo => {
      // Actualizez div-ul pentru a afișa informați despre pisică
      catInfoDiv.innerHTML = `
       <div class="cat">
       <img src="${catInfo.imageUrl}" alt="Cat Image"  class="cat-image">
       <div class="cat-container">
       <p ><b>${catInfo.breed}</b> </p>
       <p >${catInfo.description}</p>
       <p><b>Temperament</b>: ${catInfo.temperament}</p>
       </div>
       </div>
      `;
    })
    .catch(error => {
      console.error('Error fetching cat info:', error);
      catInfoDiv.innerHTML = '<p>Error fetching cat info</p>';
    });
});
