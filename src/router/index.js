import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CartView from "@/views/CartView.vue";
import UserView from "@/views/UserView.vue";
import FavouriteView from "@/views/FavouriteView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },
  {
    path: "/favourite",
    name: "favourite",
    component: FavouriteView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
