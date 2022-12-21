<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref(false);

const login = () => {
    if (username.value === "tmdb" && password.value === "movies") {
        router.push("/purchase");
    } else {
        error.value = true;
    }
};
</script>

<template>
    <div>
        <div class="login-container">
            <h1>Login To Browse</h1>
            <br>
            <form @submit.prevent="login()">
                <input type="text" v-model="username" placeholder="Username" id="username" />
                <input type="password" v-model="password" placeholder="Password" id="password" />
                <input type="submit" value="Login" id="login" />
            </form>
            <br>
            <div v-if="error" class="error">
                <p>Try "tmdb" for Username, and "movies" for Password. ( ;</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100vw;
    height: 80vh;
}

h1 {
    font-size: 2.5rem;
}

::placeholder {
    color: #c2880cb3;
}

form {
    flex-direction: column;
    padding-bottom: 5%;
}

#username {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    margin-left: auto;
    margin-right: auto;
}

#password {
    margin-left: auto;
    margin-right: auto;
}

#login {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border: rgb(255, 180, 18) solid 3px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
}

#login:hover {
    transition: .2s ease;
    background-color: rgb(199, 142, 19);
    border: rgb(255, 200, 83) solid 3px;
    color: black;
}

#login:active {
    background-color: rgb(255, 180, 18);
    border: rgb(255, 180, 18) solid 3px;
}

form input {
    margin: 0% auto;
    box-shadow: 0px 0px 15px #c2870c;
    text-align: center;
    width: 80%;
    height: 40%;
    min-height: 35px;
    font-size: 180%;
    border: rgb(255, 180, 18) solid 3px;
    /* Animation */
    animation-name: glowEffect;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

form input:focus {
    outline: none;
    border-color: #ffbd2f;
    animation-name: glowEffectSelected;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

form input:hover {
    border-color: rgb(255, 200, 83);
    animation: glowEffect 0.5s infinite alternate-reverse;
}

form input {
    padding: 0.25rem;
    margin-left: 10%;
    margin-right: 10%;
    font-size: 1.5rem;
    font-weight: bold;
}

p {
    text-align: center;
    display: block;
}

@keyframes glowEffect {
    from {
        box-shadow: 0px 0px 18px #c2870c;
    }

    to {
        box-shadow: 0px 0px 10px #c2870c;
    }
}

@keyframes glowEffectSelected {
    from {
        box-shadow: 0px 0px 30px #c2870c;
    }

    to {
        box-shadow: 0px 0px 10px #c2870c;
    }
}
</style>