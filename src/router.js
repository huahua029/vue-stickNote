import Vue from 'vue'
import Router from 'vue-router'
import Content from './components/Content/Content'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Content
    }
  ]
})

export default router