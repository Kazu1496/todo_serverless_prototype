import Vue from 'vue'
import { T } from './types'

export const mutations = {
  [T.INIT_TASKS] (state) {
    state.tasks.splice(0, state.tasks.length)
  },
  [T.GET_TASKS] (state, tasks) {
    state.tasks = tasks
  },
  [T.GET_TASK] (state, task) {
    state.task = task
  },
  [T.ADD_TASK] (state, task) {
    state.tasks.push(task)
  },
  [T.UPDATE_TASK] (state, task) {
    const index = state.tasks.findIndex(obj => obj.groupId === task.groupId)
    Vue.set(state.tasks, index, Object.assign({}, state.tasks[index], task))
  },
  [T.DELETE_TASK] (state) {
    const index = state.tasks.findIndex(obj => obj.groupId === state.task.groupId)
    state.tasks.splice(index, 1)
  },
  [T.PURGE_TASKS] (state, taskIds) {
    state.tasks.forEach((obj, index) => {
      if (taskIds.includes(obj.groupId)) {
        state.tasks.splice(index, 1)
      }
    })
  }
}
