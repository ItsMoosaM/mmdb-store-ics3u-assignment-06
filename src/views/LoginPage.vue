<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Login from "../components/Login.vue"

</script>

<template>
    <div>
        <Header page="Login" buttonPush="/" buttonName="Home"></Header>
        <Login></Login>
        <Footer></Footer>
    </div>
</template>

<style scoped>
</style>