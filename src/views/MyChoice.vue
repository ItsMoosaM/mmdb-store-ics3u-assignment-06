<script setup>
// api_key= ba4adcc4706ed37650e0a813de11a08f;

import { ref } from "vue";
import { useRouter } from "vue-router";

import axios from "axios";

import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Modal from "../components/Modal.vue";

// import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { useStore } from "../store/index.js";

// library.add(FontAwesomeIcon)
// Vue.component('font-awesome-icon', FontAwesomeIcon)

const store = useStore();

const props = defineProps({
  movieId: String,
});

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref(false);

let modalId = ref(null);
let isModalOpen = ref(false);
let allMovieData = ref(null);

const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};

let cartArray = [];
let movieTrending = ref[null];

const getCartMovies = async (movieId) => {
  const extraData = await getData(`https://api.themoviedb.org/3/movie/${movieId}`, {
    params: {
      api_key: "ba4adcc4706ed37650e0a813de11a08f",
      append_to_response: "videos",
    },
  });
  // console.log(movieId);
  allMovieData.value = extraData.data;
  console.log(allMovieData.value);

  movieTrending.value.length += 1;
  movieTrending.value.push(allMovieData);
  console.log(movieTrending)
};

const addCartItems = () => {
  store.myChoice.forEach(choice =>
    getCartMovies(choice));
  console.log(movieTrending)

}
addCartItems()

const showModal = (id) => {
  console.log(id)
  modalId.value = `${id}`;
  isModalOpen.value = true;
}
const clearCart = () => {
  store.cartMovies.length = 0;
}
</script>

<template>
  <div class="store-container">
    <Header page="My Choice" buttonPush="/cart" buttonName="Cart"></Header>
    <div class="trending-container">
      <button id="trendingOrTop" @click="router.push('/search')">Search</button>
    </div>
    <div class="images">
      <TransitionGroup name="moviePostersList">
        <li class="image-container" v-for="movies in store.myChoice" :key="movies">
          <img class="moviePosters" :src="`https://image.tmdb.org/t/p/w500${movies.poster_path}`" 
            :props.movieId="`${movies.id}`" @click="showModal(movies.id)" />
        </li>
      </TransitionGroup>
    </div>
    <Footer />
    <Modal :show="isModalOpen" @close="isModalOpen = false" :id="modalId" />
  </div>
</template>

<style scoped>
.cartButton-enter-active{
  transition: opacity .5s linear, transform .5s ease;
}
.cartButton-leave-active {
  transition: opacity .5s linear, transform .5s ease;
}

.cartButton-enter-from,
.cartButton-leave-to {
  opacity: 0;
  transform: scale(0);
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
.list-move,
.emptyCart-enter-active {
  transition: opacity 5s ease, transform 2s ease;
}
.emptyCart-leave-active {
  transition: opacity 0.3s ease;
}
.emptyCart-enter-from,
.emptyCart-leave-to {
  transform: scale(0);
  opacity: 0;
}

.clear-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.clear-button {
  font-size: 170%;
  background-color: transparent;
  border: solid 3px darkgoldenrod;
  line-height: 150%;
  margin-top: 2%;
  padding: 0px 5% 0px 5%;
  border-radius: 0.05rem;
}

.clear-button:hover {
  transition: .1s ease;
  font-size: 170%;
  background-color: rgba(184, 135, 11, 0.2);
  cursor: pointer;
}

.fa {
  font-size: 5rem;
  background-color: transparent;
}

.empty-cart-container {
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
}

.text-overlay {
  border: darkgoldenrod solid 5px;
  text-align: center;
  padding: 2rem;
}

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

.goBuy {
  font-size: 170%;
  background-color: transparent;
  border: solid 3px darkgoldenrod;
  line-height: 150%;
  margin-top: 2%;
  padding: 0px 5% 0px 5%;
  border-radius: 0.05rem;
}

.goBuy:hover {
  transition: .1s ease;
  font-size: 170%;
  background-color: rgba(184, 135, 11, 0.2);
  cursor: pointer;
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
</style>