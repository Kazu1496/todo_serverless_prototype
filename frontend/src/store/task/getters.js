import { TaskListEnum } from '../../types/index'

export const getters = {
  getTasks (state) {
    const taskList = {}
    Object.keys(TaskListEnum).forEach(key => {
      const _tasks = state.tasks.filter(task => task.attributes.list === key)
      taskList[key] = _tasks
    })
    return taskList
  },
  getTask (state) {
    return state.task
  }
}
