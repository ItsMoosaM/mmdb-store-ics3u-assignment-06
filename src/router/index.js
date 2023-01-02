import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue";
import PurchasePage from "../views/Purchase.vue";
import Trending from "../views/Trending.vue";
import TopRated from "../views/TopRated.vue";
import MyChoice from "../views/MyChoice.vue";
import Cart from "../views/Cart.vue";
import About from "../views/About.vue";
import Search from "../views/Search.vue";

const router = createRouter({
  history: createWebHistory('/mmdb-store-ics3u-assignment-06/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/purchase',
      component: PurchasePage
    },
    {
      path: '/trending',
      component: Trending
    }, {
      path: '/toprated',
      component: TopRated
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/mychoice',
      component: MyChoice
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/:pathMatch(.*)',
      component: Search
    }
  ],
});

export default router;