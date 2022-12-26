<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import router from '../router';

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Modal from "../components/Modal.vue";

let modalId = ref(null);
let isModalOpen = ref(false);
let allMovieData = ref(null);
let pageOn = ref(1);

let movieTrending = ref(null);

const props = defineProps({
  movieId: String,
});

const GoToPage = () => {
  router.push('/toprated');
}

const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};
const get20Movies = async () => {
  const movieData = (
    await getData("https://api.themoviedb.org/3/trending/movie/week?", {
      params: {
        api_key: "ba4adcc4706ed37650e0a813de11a08f",
        page: pageOn.value,
        adult: false
      },
    })
  ).data.results;
  pageOn.value++
  console.log(movieData);
  if (movieTrending.value == null) {
    movieTrending.value = movieData;
  } else {
    movieTrending.value = movieTrending.value.concat(movieData);
  }
  console.log(movieTrending);
};
get20Movies();
const showModal = (id) => {
  console.log(id)
  modalId.value = `${id}`;
  isModalOpen.value = true;
}
</script>

<template>
  <div class="store-container">
    <Header page="Movies" buttonPush="/cart" buttonName="Cart" />
    <div class="trending-container">
      <button id="trendingOrTop" @click="GoToPage">Get Top Rated</button>
    </div>
    <div class="images">
      <TransitionGroup name="moviePostersList">
        <li class="image-container" v-for="movies in movieTrending" :key="movies">
          <img class="moviePosters" :src="`https://image.tmdb.org/t/p/w500${movies.poster_path}`" :alt="movies.title"
            :props.movieId="`${movies.id}`" @click="showModal(movies.id)" />
        </li>
      </TransitionGroup>
    </div>
    <Footer />
    <button id="moreMoviesButton" @click="get20Movies" v-if="(pageOn <= 5)">More Movies</button>
    <h3 v-if="(pageOn > 5)" class="thatsIt">That's Enough!!!</h3>

    <Modal :show="isModalOpen" @close="isModalOpen = false" :id="modalId" />
  </div>
</template>

<style scoped>
.trending-container {
  position: absolute;
  margin: auto;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-self: center;
  justify-content: center;
  align-items: center;
  height: 4rem;
}

#trendingOrTop {
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 1rem;
  border: rgb(255, 180, 18) solid 3px;
  background-color: darkgoldenrod;
  color: black;
  width: 30%;
  height: 2.5rem;
  font-size: 130%;
  cursor: pointer;
}

#trendingOrTop:hover {
  transition: .2s ease;
  background-color: rgb(255, 180, 18);
  color: black;
}

#trendingOrTop:active {
  background-color: rgb(255, 180, 18);
  border: rgb(255, 180, 18) solid 3px;
}

.thatsIt {
  text-align: center;
  margin-top: 1rem;
}

#moreMoviesButton {
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 1rem;
  border: rgb(255, 180, 18) solid 3px;
  background-color: darkgoldenrod;
  color: black;
  width: 40%;
  height: 3rem;
  font-size: 150%;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;

  box-shadow: 0px 5px 0rem 0vw rgb(116, 85, 9);
}

#moreMoviesButton:hover {
  transition: .2s ease;
  background-color: rgb(210, 154, 12);
  color: black;
}

#moreMoviesButton:active {
  background-color: rgb(236, 173, 15);
  border: rgb(255, 193, 37) solid;
  box-shadow: 0px 0px 0rem 0vw rgb(116, 85, 9);
}

.close-mask {
  position: absolute;
  top: 0%;
  left: 0%;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
}

.list-move,
.moviePostersList-enter-active {
  transition: opacity 5s ease, transform 2s ease;
}

.moviePostersList-leave-active {
  transition: opacity 0.3s ease;
}

.moviePostersList-enter-from,
.moviePostersList-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.store-container {
  width: 100%;
  margin-bottom: 5rem;
}

.images {
  margin: 0 2% 0 2%;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  row-gap: 1rem;
}

.image-container {
  text-align: center;
  display: grid;
  grid-column: span 1;
  margin: auto;
}

.image-container img {
  aspect-ratio: 2/3;
  width: 100%;
  height: 100%;
}

.moviePosters {
  max-width: 100%;
  max-height: 100%;
  border: solid darkgoldenrod 4px;
  border-radius: 0.2rem;
}

.moviePosters:hover {
  border-color: #ffbd2f;
  cursor: pointer;
  transform: scale(1.04);
  transition: transform 0.2s;
}

@media screen and (max-width: 200px) and (max-width: 400px) {
  .images {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (max-width: 400px) and (min-width: 200px) {
  .images {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 500px) and (min-width: 400px) {
  .images {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
