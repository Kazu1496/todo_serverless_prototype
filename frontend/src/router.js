import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/pages/PageTop.vue'
import Signin from './components/pages/PageSignin.vue'
import ShowItem from './components/pages/PageShowItem.vue'
import { T } from './store/user/types'
import store from './store'

import { AmplifyEventBus, AmplifyPlugin } from 'aws-amplify-vue'
import * as AmplifyModules from 'aws-amplify'

Vue.use(Router)
Vue.use(AmplifyPlugin, AmplifyModules)

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
      path: '/cards/:card_id',
      name: 'show-item',
      component: ShowItem,
      meta: { requiresAuth: true }
    }
  ]
})

let user

const getUser = () => {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
    if (data && data.signInUserSession) {
      store.commit(`user/${T.SET_USER}`, data)
      return data
    }
  }).catch(() => {
    store.commit(`user/${T.SET_USER}`, null)
    return null
  })
}

// ユーザー管理
getUser().then((user) => {
  if (user) {
    router.push({ path: '/' })
  }
})

// ログイン管理
AmplifyEventBus.$on('authState', async (state) => {
  if (state === 'signedOut') {
    user = null
    store.commit(`user/${T.SET_USER}`, null)
    router.push({ path: '/signin' })
  } else if (state === 'signedIn') {
    user = await getUser()
    router.push({ path: '/' })
  }
})

// リダイレクト処理
router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    user = await getUser()
    if (!user) {
      return next({
        path: '/signin'
      })
    }
    return next()
  }
  return next()
})

export default router
