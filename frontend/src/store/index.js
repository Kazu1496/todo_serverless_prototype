import Vue from 'vue'
import Vuex from 'vuex'
import task from './task/index'
import user from './user/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    task: task,
    user: user
  }
})

export default store
