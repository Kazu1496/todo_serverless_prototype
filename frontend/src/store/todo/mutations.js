import { T } from './types'
import { TaskListEnum } from '../../types/index'

export const mutations = {
  [T.GET_TASKS] (state, tasks) {
    Object.key(TaskListEnum).forEach(key => {
      const _tasks = tasks.filter(task => task.attributes.label === key)
      state.tasks.push({ key: _tasks })
    })
  },
  [T.GET_TODO] (state, id) {
    state.tasks.forEach(item => {
      if (item.id === id) {
        state.todo = item
      }
    })
  },
  [T.ADD_TODO] (state, todo) {
    state.todos.push(todo)
    state.todoLists.forEach(todoList => {
      if (todoList.label === todo.label) {
        todoList.todos.push(todo)
      }
    })
  },
  // TODO ゴリ押し感がすっごいのであとで直す
  [T.UPDATE_TODO] (state, { todo, beforeTodo }) {
    state.todoLists.forEach(todoList => {
      if (todoList.label !== todo.label) {
        todoList.todos.forEach((item, index) => {
          if (item.id === todo.id) {
            todoList.todos.splice(index, 1)
          }
        })
      } else {
        if (!todoList.todos.includes(beforeTodo)) {
          todoList.todos.push(todo)
        }
        todoList.todos.forEach(item => {
          if (item.id === todo.id) {
            item = todo
          }
        })
      }
    })
  },
  [T.DELETE_TODO] (state, todo) {
    state.todoLists.forEach(todoList => {
      todoList.todos.forEach((item, index) => {
        if (item.id === todo.id) {
          todoList.todos.splice(index, 1)
        }
      })
    })
  },
  [T.PURGE_TODO] (state, todo) {
    state.todoLists.forEach(todoList => {
      if (todoList.label === 'Done') {
        todoList.todos = []
        // TODO なぜか空配列を代入しても値が更新されないので一旦リフレッシュで対応
        window.location.reload()
      }
    })
  }
}
