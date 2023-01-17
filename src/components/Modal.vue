<script setup>
import { ref, watchEffect } from 'vue'
import axios from "axios";

import { useStore } from "../store/index.js";
const store = useStore();

const props = defineProps({
  show: Boolean,
  id: String
});

let allMovieData = ref(null);

const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    // console.log(error);
  }
};
const getMovieData = async (movieId) => {
  const extraData = await getData(`https://api.themoviedb.org/3/movie/${movieId}`, {
    params: {
      api_key: "ba4adcc4706ed37650e0a813de11a08f",
      append_to_response: "videos",
    },
  });
  // console.log(movieId);
  allMovieData.value = extraData.data;
  // console.log(allMovieData.value);
};

watchEffect(() => {
  getMovieData(props.id)
});

const addMovie = () => {
  store.cartMovies.push(allMovieData.value);
};
const removeMovie = () => {
  store.cartMovies.splice(store.cartMovies.findIndex(v => v.id == allMovieData.value.id), 1);
};

</script>

<template>
  <Transition>
    <div v-if="show" class="modal-mask" @click="$emit('close')">
      <!-- <Transition name="pop"> -->
      <div class="modal-container" @click.stop="">
        <button @click="$emit('close')" class="x-button">X</button>
        <div class="modal-content-container">
          <div class="modal-info-container">
            <h3 class="title">{{ allMovieData.title }}</h3>
            <h5 class="tagline" v-if="(allMovieData.tagline != '')">{{ allMovieData.tagline }}</h5>
            <p class="overview">{{ allMovieData.overview }}</p>
            <!-- <p class="overview">{{ allMovieData.id }}</p> -->
            <!-- <p class="overview">{{ allMovieData.poster_path }}</p> -->
            <div class="poster">
              <a :href="`${allMovieData.homepage}`" target="_blank">
                <img :src="`https://image.tmdb.org/t/p/w500${allMovieData.poster_path}`" alt="" />
              </a>
            </div>
            <div class="trailer"
              v-if="(allMovieData.videos.results.filter((video) => video.type === 'Trailer').length != 0)">
              <iframe allow="fullscreen;" :src="`https://www.youtube.com/embed/${allMovieData.videos.results
              .filter((video) => video.type === 'Trailer')
              .at(0).key
              }`" frameborder="0" class="trailer"></iframe>
              <a target="_blank" :href="`https://www.youtube.com/watch?v=${allMovieData.videos.results
              .filter((video) => video.type === 'Trailer')
              .at(0).key
              }`">
                <p>View On YouTube</p>
              </a>
            </div>
            <div class="release-date-and-country">
              <h3>Release Date</h3>
              <h4>{{ allMovieData.release_date }}</h4>
              <h3 v-if="(allMovieData.production_countries.length != 0)">Country</h3>
              <h4 v-if="(allMovieData.production_countries.length != 0)">{{
                  allMovieData.production_countries.at(0).name
              }}</h4>
            </div>
            <div class="productionCompanies">
              <h3>Production Companies</h3>
              <ul>
                <li>
                  {{ allMovieData.production_companies.at(0).name }}
                </li>
                <li v-if="allMovieData.production_companies.length > 1">
                  {{ allMovieData.production_companies.at(1).name }}
                </li>
                <li v-if="allMovieData.production_companies.length > 2">
                  {{ allMovieData.production_companies.at(2).name }}
                </li>
              </ul>
            </div>
            <div class="productionCompanies">
              <h3>Genres</h3>
              <ul>
                <li>
                  {{ allMovieData.genres.at(0).name }}
                </li>
                <li v-if="allMovieData.genres.length > 1">
                  {{ allMovieData.genres.at(1).name }}
                </li>
                <li v-if="allMovieData.genres.length > 2">
                  {{ allMovieData.genres.at(2).name }}
                </li>
              </ul>
            </div>
            <div class="extraInfo"
              :style="{ 'background-image': `https://image.tmdb.org/t/p/w500${allMovieData.backdrop_path}` }">
              <!-- <img  :src="`https://image.tmdb.org/t/p/w500${allMovieData.backdrop_path}`" alt=""> -->
              <div class="money">
                <div v-if="allMovieData.budget != null">
                  <h3>Budget</h3>
                  <h4>{{ new Intl.NumberFormat('en-US', {
                      style: 'currency', currency: 'USD', maximumFractionDigits:
                        0
                    }).format(allMovieData.budget)
                  }} USD</h4>
                </div>
                <div v-if="allMovieData.revenue != null">
                  <h3>Revenue</h3>
                  <h4>{{ new Intl.NumberFormat('en-US', {
                      style: 'currency', currency: 'USD', maximumFractionDigits:
                        0
                    }).format(allMovieData.revenue)
                  }} USD</h4>
                </div>
              </div>
              <div class="movieCollection-vote">
                <div v-if="allMovieData.belongs_to_collection != null">
                  <h3>Movie Collection</h3>
                  <h4>{{ allMovieData.belongs_to_collection.name }}</h4>
                </div>
                <h3>Vote Info</h3>
                <h4>Vote Average: {{ (allMovieData.vote_average).toFixed(1) }}</h4>
                <h4>Vote Count: {{ allMovieData.vote_count }}</h4>
              </div>
              <div class="runtime">
                <h3>Runtime</h3>
                <h4>{{ store.toHoursAndMinutes(allMovieData.runtime) }}</h4>
                <h3>View On IMDB</h3>
                <a target="_blank" :href="`http://www.imdb.com/title/${allMovieData.imdb_id}`"><h4>Go To IMDB</h4></a>
                <!-- <img :src="`https://image.tmdb.org/t/p/w500${allMovieData.poster_path}`" alt=""> -->
              </div>
            </div>
            <Transition name="cartButton" v-if="id == allMovieData.id">
              <button v-if="(store.cartMovies.filter(movie => movie.id == allMovieData.id).length == 0)"
                @click="addMovie" class="addorremove-cart-button">Add To Cart</button>
              <button v-else @click="removeMovie" class="addorremove-cart-button">Remove From Cart</button>
            </Transition>
            <br>
          </div>
        </div>
      </div>
      <!-- </Transition> -->
    </div>
  </Transition>
</template>

<style scoped>
.cartButton-enter-active,
.cartButton-leave-active {
  transition: opacity 1s linear, transform .5s ease;
}

.cartButton-enter-from,
.cartButton-leave-to {
  opacity: 0;
  transform: scale(0);
}

::-webkit-scrollbar {
  width: 10px;
  height: auto;
}

::-webkit-scrollbar-thumb {
  background: rgba(184, 135, 11, 0.2);
  border-radius: 1rem;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(205, 151, 13, 0.8);
}

.modal-mask {
  position: fixed;
  z-index: 2;
  inset: 0;
  background: rgba(0, 0, 0, .7);
  display: grid;
  place-items: center;
}

.modal-container {
  background: #0f0d06;
  padding-top: 0%;
  padding: 0.5rem;
  width: 85vw;
  min-width: 16rem;
  max-width: 95vw;
  height: 70vh;
  min-height: 16rem;
  max-height: 95vh;
  border: darkgoldenrod 0.5rem solid;
  border-radius: 0.1rem;
  margin: auto;
  resize: both;
  overflow: auto;
}

.modal-content-container {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  align-content: center;
  margin: auto;
}

.modal-info-container {
  display: grid;
  width: 100%;
  height: 100%;
  overflow: overlay;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 0.4rem;
}

.title {
  grid-column: span 6;
  margin-top: 1%;
  text-decoration: overline underline;
  background: transparent;
  text-align: center;
  font-size: 180%;
}

.poster {
  grid-column: span 2;
  padding-left: 5%;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.poster img,
.poster a {
  border-radius: 0.3rem;
  margin: auto;
  padding-right: 0%;
  width: 90%;
  height: auto;
  max-width: 200px;
  max-height: 300px;
}

.poster img:hover {
  cursor: pointer;
  transform: scale(1.01);
  transition: all 0.2s;
}

.tagline {
  grid-column: span 6;
  text-align: center;
  padding-bottom: 1%;
  padding-top: 1%;
  border: 4px double darkgoldenrod;
  border-radius: 0.1;
}

.overview {
  grid-column: span 6;
  text-align: center;
  padding-bottom: 0.5rem;
}

.trailer {
  grid-column: span 4;
  text-align: center;
  /* height: fit-content; */
  margin: auto;
  width: 90%;
  height: 90%;
}

.trailer iframe {
  margin: auto;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 1%;
}

.trailer a {
  text-decoration: none;
}

.trailer a:hover {
  text-decoration: underline;
}


.release-date-and-country {
  grid-column: span 2;
  text-align: center;
}

.release-date-and-country h3 {
  padding-bottom: 6px;
  text-decoration: underline;
}

.productionCompanies {
  grid-column: span 2;
  text-align: center;

}

.productionCompanies li {
  line-height: 150%;
  list-style: square;
  list-style-position: inside;
}

.rating {
  grid-column: span 2;
  text-align: center;
}

.extraInfo {
  background-color: transparent;
  grid-column: span 6;
  display: grid;
  text-align: center;
  grid-template-columns: repeat(3, 1fr);
}

.extraInfo img {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  grid-column: span 1;
  overflow: hidden;
  max-height: 10rem;
}

.extraInfo h3 {
  text-decoration: underline;
}

.money {
  grid-column: span 1;
}

.movieCollection-vote {
  grid-column: span 1;
}

.runtime {
  grid-column: span 1;
}.runtime a{
  text-decoration: none;
}.runtime a h4{
  padding: 5%;
}.runtime a:hover{
  text-decoration: underline overline;
  /* color: black; */
}
/* .runtime a h4:hover{
  background-color: darkgoldenrod;
  color: black;
  transition: all 0.1s linear;
} */

.runtime img {
  width: 100%;
}

.x-button {
  position: absolute;
  text-align: right;
  background: none;
  border: none;
  cursor: pointer;
}

.x-button:hover {
  color: #ffca45;
}

.close-button:hover {
  background: #ffca45;
}

.v-enter-active {
  transition: opacity 0.3s ease;
}

.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.pop-enter-active {
  transition: transform 0.2s linear;
}

.pop-leave-active {
  transition: transform 0.2s linear;
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}


.addorremove-cart-button {
  grid-column: span 6;
  display: flex;
  margin-top: .5rem;
  margin-bottom: .5rem;

  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 1rem;
  border: rgb(255, 180, 18) solid 3px;
  background-color: darkgoldenrod;
  color: black;
  width: 50%;
  height: 100%;
  font-size: 120%;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  box-shadow: 0px 5px 0rem 0vw rgb(116, 85, 9);
}

.addorremove-cart-button:hover {
  transition: .2s ease;
  background-color: rgb(210, 154, 12);
  color: black;
}

.addorremove-cart-button:active {
  background-color: rgb(236, 173, 15);
  border: rgb(255, 193, 37) solid;
  box-shadow: 0px 0px 0rem 0vw rgb(116, 85, 9);
}
</style>