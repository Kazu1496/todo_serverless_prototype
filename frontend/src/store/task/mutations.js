import { T } from './types'
import { TaskListEnum } from '../../types/index'

export const mutations = {
  [T.GET_TASKS] (state, tasks) {
    const obj = {}
    Object.keys(TaskListEnum).forEach(key => {
      const _tasks = tasks.filter(task => task.attributes.list === key)
      obj[key] = _tasks
      state.tasks = obj
    })
  },
  [T.ADD_TASK] (state, task) {
    const taskList = state.tasks[task.attributes.list]
    taskList.push(task)
  },
  [T.GET_TASK] (state, task) {
    state.task = task
  },
  [T.UPDATE_TASK] (state, task) {
    const taskList = state.tasks[task.attributes.list]
    taskList.forEach(obj => {
      if (obj.groupId === task.groupId) {
        obj = task
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
  }
}
