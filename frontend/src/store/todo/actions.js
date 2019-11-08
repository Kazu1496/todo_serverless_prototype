import { T } from './types'
import Amplify from 'aws-amplify'

export const actions = {
  async [T.GET_TASKS] ({ commit }) {
    await Amplify.API.get('dev-sls-api', '/tasks')
      .then(res => {
        console.log(res, 'res')
        commit(T.GET_TASKS, res.data)
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
  }
}
