import { defineStore } from 'pinia'
import axios from "axios";
import { ref } from "vue";


// const getData = async (url, params) => {
//   try {
//     return await axios.get(url, params);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const getGenresNew = async (genre) => {
//   genre = (
//       await getData("https://api.themoviedb.org/3/discover/movie?", {
//           params: {
//               api_key: "ba4adcc4706ed37650e0a813de11a08f",
//               with_genres: genre.id,
//               page: pageOn.value,
//               include_adult: false
//           },
//       })
//   ).data.results;
//   };

// genres.forEach(element => {
//   getGenresNew(element)
//   console.log(genres)
// });

// const getGenres = async () => {
//   const movieData = (
//       await getData("https://api.themoviedb.org/3/discover/movie?", {
//           params: {
//               api_key: "ba4adcc4706ed37650e0a813de11a08f",
//               with_genres: selectedOption.value.id,
//               page: pageOn.value,
//               include_adult: false
//           },
//       })
//   ).data.results;
//   //   pageOn.value++
//   console.log(movieData);
//   console.log(selectedOption.value.title)
//   //   if (movieTrending.value == null) {
//   movieTrending.value = movieData;
//   //   } else {
//   //     movieTrending.value = movieTrending.value.concat(movieData);
//   //   }
//   //   console.log(movieTrending);
// };


export const useStore = defineStore('store;', {
  state: () => {
    return {
      cartMovies: [
        // {id: 436270, poster_path:"/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"},
        // {id: 76600, poster_path:"/94xxm5701CzOdJdUEdIuwqZaowx.jpg"}
      ],
      genres: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],

      action: [],
    }
  },
  actions: {
    log() {
      console.log(this.genres)
    }
  },
});

