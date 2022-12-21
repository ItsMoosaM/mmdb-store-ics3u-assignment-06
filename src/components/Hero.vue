<script setup>
import { useRouter } from "vue-router";
const router = useRouter();


</script>

<template>
  <div class="hero-container">
    <div class="video-container">
      <div id="overlay">
      </div>
      <video autoplay muted loop>
        <source src="../assets/marvel-opening-theme.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="text-overlay">
      <h2>MMDB&#8482 Presents</h2>
      <h1>MMDB Store</h1>
      <h6>For All Your Movie Needs</h6>
      <button id="loginButton" @click="router.push('/login')">Login</button>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 86vh;
}

.video-container {
  height: 100%;
  width: 100%;
  position: relative;
}

#overlay {
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 95%;
  object-fit: cover;
  position: absolute;
}

.video-container video {
  width: 100vw;
  height: 100%;
  object-fit: cover;
}

.text-overlay {
  position: absolute;
  padding: 1.8rem;
  font-size: 4vw;
  background-color: transparent;
  border-radius: 1rem;
  animation: 1s linear textGlow 10s infinite alternate;
}
@keyframes textGlow {
  /* 0% {
    box-shadow: 0px 0px 0rem 0vw darkgoldenrod, inset 0px 0px 0rem 0vw darkgoldenrod;
  }
  30%{
    box-shadow: 0px 0px 0rem 0vw darkgoldenrod, inset 0px 0px 0rem 0vw darkgoldenrod;
  } */
  0%{
    box-shadow: 0px 0px .1rem 0vw darkgoldenrod, inset 0px 0px .1rem 0vw darkgoldenrod;
  }
  100% {
    box-shadow: 0px 0px 1rem 1vw darkgoldenrod, inset 0px 0px 1rem .5vw darkgoldenrod;
  }
}
.text-overlay h1{
  font-size: 360%;
  text-decoration: overline underline;
  background-color: transparent;
  line-height: 150%;
  opacity: 0%;
  animation: 2.5s linear 3.5s textFade forwards;
}.text-overlay h2{
  background-color: transparent;
  line-height: 150%;
  opacity: 0%;
  animation: 2s linear 1.5s textFade forwards;
}.text-overlay h6{
  font-size: 150%;
  text-decoration: none;
  background-color: transparent;
  line-height: 150%;
  opacity: 0%;
  animation: 2s linear 6s textFade forwards;
}.text-overlay button{
  font-size: 170%;
  background-color: transparent;
  border: solid 3px darkgoldenrod;
  line-height: 150%;
  opacity: 0%;
  animation: 2s linear 6s textFade forwards;
  margin-top: 2%;
  padding: 0px 5% 0px 5%;
  border-radius: 0.05rem;
}.text-overlay button:hover{
  transition: .1s ease;
  font-size: 170%;
  background-color: rgba(184, 135, 11, 0.2);
  cursor: pointer;
}


@keyframes textFade {
  from {
    opacity: 0%;
    transform: scale(0.90);
  }
  to {
    opacity: 100%;
    transform: scale(1);
  }
}

img {
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 500px){
  .text-overlay{
    font-size: 20px;
  }
}
</style>