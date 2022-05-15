import { createRouter, createWebHistory  } from 'vue-router';
import Login from "@/Login.vue";
import Registrasi from "@/Registrasi.vue";
// import { useQuasar } from 'quasar'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
			fullscreen: true,
		}
  },
  {
    path: '/registrasi',
    name: 'Registrasi',
    component: Registrasi,
    meta: {
			fullscreen: true,
		}
  },
  {
    path: '/product',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      requiresAuth: true,
   },
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      requiresAuth: true,
   },
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      router.push({path:'/'})
    }else{
      next();
      console.log('ss')
    }
  } else {
    next();
    console.log('ssa')
  }
});
export default router



