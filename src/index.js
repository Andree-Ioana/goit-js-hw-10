import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

const populateBreeds = () => {
  loader.style.display = "block";
  breedSelect.style.display = "none";
  error.style.display = "none";

  fetchBreeds()
    .then((breeds) => {
      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      breedSelect.style.display = "block";
      loader.style.display = "none";
    })
    .catch((err) => {
      loader.style.display = "none";
      error.style.display = "block";
    });
};

const displayCatInfo = (breedId) => {
  loader.style.display = "block";
  catInfo.style.display = "none";
  error.style.display = "none";

  fetchCatByBreed(breedId)
    .then((catData) => {
      const cat = catData[0];
      const breedName = cat.breeds[0].name;
      const description = cat.breeds[0].description;
      const temperament = cat.breeds[0].temperament;
      const imageUrl = cat.url;

      catInfo.innerHTML = `
        <div class = "cat">
        <img src="${imageUrl}" alt="${breedName}"  class="cat-image">
       <div class="cat-container">
       <p><b>${breedName}</b> </p>
       <p> ${description}</p>
       <p><b>Temperament:</b> ${temperament}</p>
       </div>
        </div>
      `;

      catInfo.style.display = "block";
      loader.style.display = "none";
    })
    .catch((err) => {
      loader.style.display = "none";
      error.style.display = "block";
    });
};


breedSelect.addEventListener("change", (event) => {
  const selectedBreedId = event.target.value;
  displayCatInfo(selectedBreedId);
});


populateBreeds();
