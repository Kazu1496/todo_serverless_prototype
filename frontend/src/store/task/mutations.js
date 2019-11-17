import { T } from './types'
import { TaskListEnum } from '../../types/index'

export const mutations = {
  [T.INIT_TASKS] (state) {
    state.tasks = {}
  },
  [T.GET_TASKS] (state, tasks) {
    const _obj = {}
    Object.keys(TaskListEnum).forEach(key => {
      const _tasks = tasks.filter(task => task.attributes.list === key)
      _obj[key] = _tasks
      state.tasks = _obj
    })
  },
  [T.GET_TASK] (state, task) {
    state.task = task
  },
  [T.ADD_TASK] (state, task) {
    const taskList = state.tasks[task.attributes.list]
    taskList.push(task)
  },
  [T.UPDATE_TASK] (state, task) {
    const beforeList = state.tasks[state.task.attributes.list]
    const afterList = state.tasks[task.attributes.list]
    beforeList.forEach((obj, index) => {
      if (obj.groupId === state.task.groupId) {
        beforeList.splice(index, 1)
        afterList.push(task)
      }
    })
  },
  [T.DELETE_TASK] (state) {
    const taskList = state.tasks[state.task.attributes.list]
    taskList.forEach((obj, index) => {
      if (obj.groupId === state.task.groupId) {
        taskList.splice(index, 1)
      }
    })
  },
  [T.PURGE_TASKS] (state) {
    state.tasks.DONE.splice(0, state.tasks.DONE.length - 1)
  }
}
