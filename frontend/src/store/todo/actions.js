import { T } from './types'
import axios from 'axios'

const URL = process.env.VUE_APP_API_URL_BASE
export const actions = {
  async [T.GET_LABELS] ({ commit }) {
    await axios.get(`${URL}/card_labels`)
      .then(res => {
        commit(T.GET_LABELS, res.data)
      })
  },
  async [T.GET_TODOLISTS] ({ commit }) {
    await axios.get(`${URL}/cards`)
      .then(res => {
        commit(T.GET_TODOLISTS, res.data)
      })
  },
  [T.GET_TODO] ({ commit }, id) {
    commit(T.GET_TODO, id)
  },
  async [T.ADD_TODO] ({ commit }, todo) {
    await axios.post(`${URL}/cards`, todo)
      .then(res => {
        commit(T.ADD_TODO, res.data)
      })
      .catch(_ => {
        alert('TODOが追加できませんでした')
      })
  },
  async [T.UPDATE_TODO] ({ commit }, { todoId, beforeTodo, todo }) {
    await axios.patch(`${URL}/cards/${todoId}`, todo)
      .then(res => {
        commit(T.UPDATE_TODO,
          {
            todo: res.data,
            beforeTodo: beforeTodo
          }
        )
      })
      .catch(err => {
        alert(err)
      })
  },
  async [T.DELETE_TODO] ({ commit }, id) {
    await axios.delete(`${URL}/cards/${id}`)
      .then(res => {
        commit(T.DELETE_TODO, res.data)
      })
      .catch(err => {
        alert(err)
      })
  },
  [T.PURGE_TODO] ({ commit }, todoLists) {
    todoLists.forEach(todoList => {
      if (todoList.label === 'Done') {
        todoList.todos.forEach(todo => {
          axios.delete(`${URL}/cards/${todo.id}`)
            .then(res => {
              commit(T.PURGE_TODO, res.data)
            })
            .catch(err => {
              alert(err)
            })
        })
      }
    })
  }
}
