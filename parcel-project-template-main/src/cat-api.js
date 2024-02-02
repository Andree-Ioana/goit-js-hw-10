import axios from 'axios';

export const fetchBreeds = () => {
  const apiUrl = 'https://api.thecatapi.com/v1/breeds';

  return axios
    .get(apiUrl)
    .then(response => {
      //verific daca solicitarea este reusita si obtin id ul si denumirea rasei
      if (
        response.status === 200 &&
        response.data &&
        Array.isArray(response.data)
      ) {
        //response.data este matricea obtinuta de la api prin metoda axios
        //aplic metoda map ca sa iterez prin fiecare element al matricei si sa obtin un nou obiect cu datele furnizate
        const formattedBreeds = response.data.map(breed => ({
          value: breed.id,
          label: breed.name,
        }));
        return formattedBreeds;
      } else {
        return Promise.reject(new Error('Invalid response from the API'));
      }
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      return Promise.reject(error);
    });
};

export const fetchCatByBreed = breedId => {
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios
    .get(apiUrl)
    .then(response => {
      if (
        response.status === 200 &&
        response.data &&
        Array.isArray(response.data)
      ) {
        // iau primul element din matrice pentru a avea informatii doar despre o pisica selectata
        const catInfo = response.data[0];

        // breeds este un elemnt al matricei adica primul element
        return {
          imageUrl: catInfo.url,
          breed: catInfo.breeds[0].name,
          description: catInfo.breeds[0].description,
          temperament: catInfo.breeds[0].temperament,
        };
      } else {
        return Promise.reject(new Error('Invalid response from the API'));
      }
    })
    .catch(error => {
      console.error('Error fetching cat info:', error);
      return Promise.reject(error);
    });
};
