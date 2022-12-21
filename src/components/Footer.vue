<script setup>
import router from '../router';

const GoToAbout = () => {
  router.push("/about")
}
</script>

<template>
  <div>
    <div id="footerContainer">
      <h3 class="title 1" @click="router.push('/search')">By Moosa Mughal</h3>
      <div class="logo-container">
        <img src="../assets/MMDB-Logo-Gold.png" alt="" @click="router.push('/')">
      </div>
      <a id="tmdbLink" href="https://developers.themoviedb.org/3" target="_blank" rel="noopener noreferrer">
        <h3 @click="('https://developers.themoviedb.org/3')">Using The TMDB API</h3>
      </a>
    </div>
  </div>
</template>

<style scoped>
#footerContainer {
  position: fixed;
  display: flex;
  justify-content: left;
  align-items: center;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4rem;
  margin: auto auto;
  border-top: solid 3px darkgoldenrod;
  background-color: black;
}

.title {
  float: left;
  display: inline;
  background-color: transparent;
  margin-left: 3%;
  cursor: pointer;
}

.title:hover {
  text-decoration: underline;
}

.title2 {
  float: left;
  display: inline;
  background-color: transparent;
  margin-left: 1%;
  margin-top: 0.5%;
}

.logo-container {
  pointer-events: none;
  display: flex;
  position: absolute;
  justify-self: center;
  align-self: center;
  margin: auto;
  height: 100%;
  width: 100%;
  background-color: transparent;
}

.logo-container img {
  pointer-events: auto;
  display: flex;
  justify-self: center;
  align-self: center;
  margin: auto;
  height: 2rem;
  width: auto;
  cursor: pointer;
}

.logo-container img:hover {
  width: auto;
  cursor: pointer;
  transform: scale(1.04);
  transition: all 0.2s;
}

#tmdbLink {
  background-color: transparent;
  text-decoration: none;
  margin-left: auto;
  margin-right: 3%;
  text-align: right;
  float: right;
}

#tmdbLink:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>