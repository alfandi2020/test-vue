import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/Login.vue";
import Registrasi from "@/Registrasi.vue";
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/registrasi',
    name: 'Registrasi',
    component: Registrasi
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
