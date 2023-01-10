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
      component: Home,
      meta: {
        title: "MMDB Store"
      }
    },
    {
      path: '/login',
      component: LoginPage,
      meta: {
        title: "Login"
      }
    },
    {
      path: '/purchase',
      component: PurchasePage,
      meta: {
        title: "Genres"
      }
    },
    {
      path: '/trending',
      component: Trending,
      meta: {
        title: "Trending"
      }
    }, {
      path: '/toprated',
      component: TopRated,
      meta: {
        title: "Top Rated"
      }
    },
    {
      path: '/cart',
      component: Cart,
      meta: {
        title: "My Cart"
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: "About"
      }
    },
    {
      path: '/mychoice',
      component: MyChoice,
      meta: {
        title: "My Choice"
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        title: "Search"
      }
    },
    {
      path: '/:pathMatch(.*)',
      component: Search
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title == "MMDB Store") {
    document.title = to.meta.title;
    next()
  } else {
    document.title = `MMDB Store | ${to.meta.title}`;
    next();
  }
})

export default router;