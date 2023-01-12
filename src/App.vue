<script setup>
import Footer from "./components/Footer.vue";

</script>

<template>
  <div class="app-container">
    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.fade-enter-active {
	animation: coming 1s;
	animation-delay: 0.2s;
	opacity: 0;
}

.fade-leave-active {
	animation: going 0.4s;
}
@keyframes going {
	from {
		transform: translateX(0);
	}
	to {
		/* transform: translateX(-10px); */
		opacity: 0;
	}
}
@keyframes coming {
	0% {
		transform: translateX(-5px);
		opacity: 0;
	}
	50%{
		transform: translateX(0px);
	}
	100% {
		opacity: 1;
	}
}
</style>
