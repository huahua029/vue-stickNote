import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/register'
import Content from './components/Content'
import Login from './components/login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Content
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
  ]
})

export default router