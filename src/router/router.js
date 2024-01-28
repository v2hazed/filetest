// router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import LoginPageVue from "@/views/LoginPage.vue";
import RegisterPageVue from "@/views/RegisterPage.vue";
import ProfilePageVue from "@/views/ProfilePage.vue";

const routes = [
  { path: "/", component: Home },

  { path: "/home", component: Home },
  { path: "/profile", component: ProfilePageVue },

  { path: "/login", component: LoginPageVue },
  { path: "/register", component: RegisterPageVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
