import Vue from 'vue'
import Vuex from 'vuex'
import todo from './todo/index'
import user from './user/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    todo: todo,
    user: user
  }
})

export default store
