<script setup>
import router from '../router';
import { useRouter } from "vue-router";

const props = defineProps({
    page: String
    , buttonName: String
    , buttonPush: String
})
const pushTo = props.buttonPush;

const GoToPage = () => {
    router.push(pushTo);
}
const GoToHome = () => {
    router.push('/');
}
</script>

<template>
    <div>
        <div id="headerContainer">
            <h1 class="title 1" @click="GoToHome">MMDB Store</h1>
            <h1 id="pageName">{{ props.page }}</h1>
            <button id="loginButton" @click="GoToPage">{{ props.buttonName }}</button>
        </div>
    </div>
</template>

<style scoped>
#headerContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    background-color: black;
    border-bottom: solid 3px darkgoldenrod;

}

.title {
    background-color: black;
    margin-left: 3%;
    cursor: pointer;
    text-decoration: overline underline;
    font-size: 5vw;
}

.title:hover {
    transition: .2s ease;
    background-color: rgba(184, 135, 11, 0.2);
}

#pageName {
    display: block;
    position: absolute;
    background-color: transparent;
    justify-content: center;
    text-align: center;
}

#loginButton {
    background-color: rgb(3, 3, 3);
    border: rgb(161, 115, 17) 5px solid;
    font-size: 1.5rem;
    margin: auto;
    float: right;
    height: 3rem;
    width: 24%;
    margin-right: 4%;
    border-radius: 1rem;
}

#loginButton:hover {
    transition: .3s ease;
    background-color: rgba(184, 135, 11, 0.2);
    cursor: pointer;
}

@media screen and (min-width: 600px) {
    .title {
        font-size: 32px;
    }
}
</style>