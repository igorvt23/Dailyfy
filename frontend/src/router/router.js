import { createRouter, createWebHistory } from 'vue-router'

// Importando as telas (views)
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue' // O seu App.vue antigo que renomeamos

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: MainView
  }
]

const router = createRouter({
  // O WebHistory remove aquele '#' feio da URL do navegador
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router