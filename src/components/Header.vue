<script setup>
import router from '../router';
import { useRouter } from "vue-router";

const props = defineProps({
    page: String
    , buttonName: String
    , buttonPush: String
    , cart: Boolean
})
const pushTo = props.buttonPush;

const GoToPage = () => {
    router.push(pushTo);
}
const GoToHome = () => {
    router.push('/');
}

props.cart = false;
</script>

<template>
    <div>
        <div id="headerContainer">
            <h1 class="title 1" @click="GoToHome">MMDB Store</h1>
            <h1 id="pageName">{{ props.page }}</h1>
            <div class="button">
                <button id="loginButton" @click="GoToPage">{{ props.buttonName }}</button>
                <slot></slot>
            </div>
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

.button {
    background-color: rgb(3, 3, 3);
    /* border: rgb(161, 115, 17) 5px solid; */
    font-size: 1.5rem;
    margin: auto;
    float: right;
    height: 3rem;
    width: 24%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4%;
    border-radius: 1rem;
}

#loginButton {
    background-color: rgb(3, 3, 3);
    border: rgb(161, 115, 17) 5px solid;
    font-size: 1.5rem;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
}

#loginButton:hover {
    transition: .3s ease;
    background-color: rgba(184, 135, 11, 0.3);
    cursor: pointer;
}

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

@media screen and (min-width: 600px) {
    .title {
        font-size: 32px;
    }
}
</style>