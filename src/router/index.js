import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store' 

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import DetailPost from '../views/DetailPost.vue'

const protect = (to, from, next) => {
  
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: protect,
  },
  {
    path: '/post/:id',
    name: 'DetailPost',
    component: DetailPost,
    beforeEnter: protect,
  },
]

const router = new VueRouter({
  routes
})

export default router
