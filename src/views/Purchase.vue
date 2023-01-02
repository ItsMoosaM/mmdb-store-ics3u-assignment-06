<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import router from '../router';

import VueSelect from 'vue-select'
import '../assets/vue-select.css'
import { useStore } from "../store/index.js";

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Modal from "../components/Modal.vue";



const store = useStore();

let modalId = ref(null);
let isModalOpen = ref(false);
let allMovieData = ref(null);
let pageOn = ref(1);

let selectedOption = ref(null);

let movieTrending = ref(null);

const props = defineProps({
    movieId: String,
});

const getData = async (url, params) => {
    try {
        return await axios.get(url, params);
    } catch (error) {
        console.log(error);
    }
};
const getGenres = async (id) => {
    const movieData = (
        await getData("https://api.themoviedb.org/3/discover/movie?", {
            params: {
                api_key: "ba4adcc4706ed37650e0a813de11a08f",
                with_genres: id,
                // selectedOption.value.id,
                page: pageOn.value,
                include_adult: false
            },
        })
    ).data.results;

    let mov = movieData
    return mov;
    //   pageOn.value++
    // console.log(movieData);
    // console.log(selectedOption.value.title)
    //   if (movieTrending.value == null) {
    // movieTrending.value = movieData;
    //   } else {
    //     movieTrending.value = movieTrending.value.concat(movieData);
    //   }
    //   console.log(movieTrending);
};
//Stores to Pinia On Load
const getAllGenres = async () => {
    store.Action = await getGenres(28);
    store.Adventure = await getGenres(12);
    store.Animation = await getGenres(16);
    store.Comedy = await getGenres(35);
    store.Crime = await getGenres(80);
    store.Documentary = await getGenres(99);
    store.Drama = await getGenres(18);
    store.Family = await getGenres(10751);
    store.Fantasy = await getGenres(14);
    store.History = await getGenres(36);
    store.Horror = await getGenres(27);
    store.Music = await getGenres(10402);
    store.Mystery = await getGenres(9648);
    store.Romance = await getGenres(10749);
    store.SciFi = await getGenres(878);
    store.TVMovie = await getGenres(10770);
    store.Thriller = await getGenres(53);
    store.War = await getGenres(10752);
    store.Western = await getGenres(37);
    console.log('On Load')
}

if (!store.IsDataLoaded) {
    getAllGenres();
    store.IsDataLoaded = true;
} else {

}

//Gets from store
const showGenre = () => {
    switch (selectedOption.value.id) {
        case 28:
            movieTrending.value = store.Action
            break;
        case 12:
            movieTrending.value = store.Adventure
            break;
        case 16:
            movieTrending.value = store.Animation
            break;
        case 35:
            movieTrending.value = store.Comedy
            break;
        case 80:
            movieTrending.value = store.Crime
            break;
        case 99:
            movieTrending.value = store.Documentary
            break;
        case 18:
            movieTrending.value = store.Drama
            break;
        case 10751:
            movieTrending.value = store.Family
            break;
        case 14:
            movieTrending.value = store.Fantasy
            break;
        case 36:
            movieTrending.value = store.History
            break;
        case 27:
            movieTrending.value = store.Horror
            break;
        case 10402:
            movieTrending.value = store.Music
            break;
        case 9648:
            movieTrending.value = store.Mystery
            break;
        case 10749:
            movieTrending.value = store.Romance
            break;
        case 878:
            movieTrending.value = store.SciFi
            break;
        case 10770:
            movieTrending.value = store.TVMovie
            break;
        case 53:
            movieTrending.value = store.Thriller
            break;
        case 10752:
            movieTrending.value = store.War
            break;
        case 37:
            movieTrending.value = store.Western
            break;
        default:
            movieTrending.value = null;
            break;
    }
}

const showModal = (id) => {
    console.log(id)
    modalId.value = `${id}`;
    isModalOpen.value = true;
}
</script>

<template>
    <div class="store-container">
        <Header page="Movies" buttonPush="/cart" buttonName="">
            <img src="../assets/cart-shopping-solid.svg" class="cartIcon" />
        </Header>
        <div class="trending-container">
            <button id="trendingOrTop" @click="router.push('/trending')">Get Trending</button>
        </div>
        <div class="genres-dropdown">
            <vue-select placeholder="Choose a Genre" class="vSelect" label="title" :options="[
    { title: 'Action', id: 28 },
    { title: 'Adventure', id: 12 },
    { title: 'Animation', id: 16 },
    { title: 'Comedy', id: 35 },
    { title: 'Crime', id: 80 },
    { title: 'Documentary', id: 99 },
    { title: 'Drama', id: 18 },
    { title: 'Family', id: 10751 },
    { title: 'Fantasy', id: 14 },
    { title: 'History', id: 36 },
    { title: 'Horror', id: 27 },
    { title: 'Music', id: 10402 },
    { title: 'Mystery', id: 9648 },
    { title: 'Romance', id: 10749 },
    { title: 'Sci-Fi', id: 878 },
    { title: 'TV Movie', id: 10770 },
    { title: 'Thriller', id: 53 },
    { title: 'War', id: 10752 },
    { title: 'Western', id: 37 },
]" v-model="selectedOption"></vue-select>
            <button id="moreMoviesButton" @click="showGenre()">Get Movies</button>
        </div>
        <div class="images">
            <TransitionGroup name="moviePostersList">
                <li class="image-container" v-for="movies in movieTrending" :key="movies">
                    <img class="moviePosters" :src="`https://image.tmdb.org/t/p/w500${movies.poster_path}`"
                        :alt="movies.title" :props.movieId="`${movies.id}`" @click="showModal(movies.id)" />
                </li>
            </TransitionGroup>
        </div>
        <!-- <Footer /> -->
        <!-- <button id="moreMoviesButton" @click="get20Movies" v-if="(pageOn <= 5)">More Movies</button> -->
        <h3 v-if="pageOn > 5" class="thatsIt">That's Enough!!!</h3>

        <Modal :show="isModalOpen" @close="isModalOpen = false" :id="modalId" />
    </div>
</template>

<style scoped>
.cartIcon {
    background-color: transparent;
    /* z-index: 10; */
    /* display: flex; */
    filter: invert(52%) sepia(53%) saturate(3003%) hue-rotate(20deg) brightness(95%) contrast(91%);
    height: 1.4rem;
    position: absolute;
    margin: auto;
    pointer-events: none;
    /* float: right; */
}
.vSelect {
    margin: 1rem;
    margin-left: 10vw;
    margin-right: 10vw;
    text-align: center;

    --vs-font-size: 1.5rem;

    --vs-controls-color: darkgoldenrod;
    --vs-border-color: darkgoldenrod;

    --vs-border-width: 4px;
    --vs-border-style: solid;
    --vs-border-radius: 2px;

    --vs-dropdown-bg: #0f0d06;
    --vs-dropdown-color: darkgoldenrod;
    --vs-dropdown-option-color: darkgoldenrod;

    --vs-selected-bg: darkgoldenrod;
    --vs-selected-color: darkgoldenrod;
    --vs-selected-border-color: darkgoldenrod;

    --vs-search-input-color: darkgoldenrod;

    --vs-dropdown-min-width: 80vw;
    --vs-dropdown-max-width: 80vw;
    --vs-dropdown-min-height: 4rem;
    --vs-dropdown-max-height: 30vh;

    --vs-dropdown-option--active-bg: darkgoldenrod;
    --vs-dropdown-option--active-color: black;

    --vs-search-input-placeholder-color: rgba(184, 135, 11, 0.845);
}

.vSelect .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
    text-align: center;
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
    transition: 0.2s ease;
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

.cartIcon {
    background-color: transparent;
    /* z-index: 10; */
    /* display: flex; */
    position: absolute;
    margin: auto;
    pointer-events: none;
    /* float: right; */
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
    width: 30%;
    padding: 8px;
    height: 100%;
    font-size: 125%;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;

    box-shadow: 0px 5px 0rem 0vw rgb(116, 85, 9);
}

#moreMoviesButton:hover {
    transition: 0.2s ease;
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
