import Vue from 'vue'
import Vuex from 'vuex'
import todo from './todo/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    todo: todo
  }
})

export default store
