import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterCodeView from '../views/RegisterCodeView.vue'
import InitView from '../views/InitView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register_code',
      name: 'register_code',
      component: RegisterCodeView
    },
    {
      path: "/init",
      name: "init",
      component: InitView
    }
  ]
})

export default router
