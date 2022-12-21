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

let searchInput = ref()

let movieTrending = ref(null);

const props = defineProps({
  movieId: String,
});

const GoToPage = () => {
  router.push('/purchase');
}

const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};
const getSearch = async () => {
  const movieData = (
    await getData("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "ba4adcc4706ed37650e0a813de11a08f",
        query: searchInput.value,
        adult: false
      },
    })
  ).data.results;
  pageOn.value++
  console.log(movieData);
  movieTrending.value = movieData;
};
// get20Movies();

const showModal = (id) => {
  console.log(id)
  modalId.value = `${id}`;
  isModalOpen.value = true;
}
</script>

<template>
  <div class="store-container">
    <Header page="Search" buttonPush="/cart" buttonName="Cart" />
    <div class="trending-container">
      <button id="trendingOrTop" @click="GoToPage">Get Genres</button>
    </div>
    <div class="searchBox">
      <form @submit.prevent="login()">
        <input type="text" placeholder="Search Something..." v-model="searchInput" id="searchBar">
        <input type="submit" id="moreMoviesButton" @click="getSearch" value="Search">
      </form>
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

.searchBox {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  margin-bottom: 2rem;
}

.searchBox form {
  display: flex;
  justify-content: center;
}

#searchBar {
  width: 80vw;
  margin-left: 2%;
  box-shadow: 0px 0px 15px #c2870c;
  text-align: left;
  min-height: 35px;
  font-size: 180%;
  border: 2px solid #c2870c;
  border-right: 0px;
  border-radius: 0.9rem;
  border-top-right-radius: 0%;
  border-bottom-right-radius: 0%;
  grid-column: span 5;
  padding: 2%;
  /* Animation */
  animation-name: glowEffect;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

::placeholder {
  color: #c2880ce6;
}

#searchBar:focus {
  outline: none;
  border-color: #ffbd2f;
  animation-name: glowEffectSelected;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

#searchBar:hover {
  border-color: #ffbd2f;
  animation: glowEffect 0.5s infinite alternate-reverse;
}

#moreMoviesButton {
  display: inline;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 1rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: #c2870c solid 3px;
  border-left:0px;
  background-color: rgb(167, 123, 12);
  margin-right: 2%;
  color: black;
  width: 20%;
  /* height: 3.3rem; */
  font-size: 150%;
  cursor: pointer;
}

#moreMoviesButton:hover {
  transition: .3s ease;
  background-color: rgb(255, 180, 18);
  color: black;
}

#moreMoviesButton:active {
  background-color: rgb(255, 180, 18);
  border: #ffbd2f solid ;
  border-left: 0px;
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

@keyframes glowEffect {
  from {
    box-shadow: 0px 0px 24px #c2870c;
  }

  to {
    box-shadow: 0px 0px 10px #c2870c;
  }
}

@keyframes glowEffectSelected {
  from {
    box-shadow: 0px 0px 32px #c2870c;
  }
  to {
    box-shadow: 0px 0px 10px #c2870c;
  }
}

@media screen and (max-width: 200px) and (max-width: 400px){
  .images {
  grid-template-columns: repeat(1, 1fr);
}}
@media screen and (max-width: 400px) and (min-width: 200px){
  .images {
  grid-template-columns: repeat(2, 1fr);
}}
@media screen and (max-width: 500px) and (min-width: 400px){
  .images {
  grid-template-columns: repeat(4, 1fr);
}}
</style>
