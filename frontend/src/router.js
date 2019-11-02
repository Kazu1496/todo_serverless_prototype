import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/pages/PageTop.vue'
import Signin from './components/pages/PageSignin.vue'
import Signup from './components/pages/PageSignup.vue'
import ShowItem from './components/pages/PageShowItem.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/',
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/cards/:card_id',
      name: 'show-item',
      component: ShowItem,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  firebase.auth().onAuthStateChanged(user => {
    if (requiresAuth) {
      if (!user) {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
})

export default router
