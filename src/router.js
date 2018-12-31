import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Register/register'
import Content from './components/Content/Content'
import Login from './components/Login/login'

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