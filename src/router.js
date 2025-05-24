import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './pages/LoginPage.vue'
import DataMarketplace from './pages/DataMarketplace.vue'
import HomePage from './pages/HomePage.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/data-marketplace', name: 'DataMarketplace', component: DataMarketplace},
  { path: '/home', name: 'Home', component: HomePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token')
  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export { router }
