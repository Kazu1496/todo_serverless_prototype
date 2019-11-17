import { T } from './types'
import Amplify from 'aws-amplify'

export const actions = {
  [T.GET_TASKS] ({ commit }) {
    Amplify.API.get('sls-api', '/tasks')
      .then(res => {
        commit(T.GET_TASKS, res)
      })
      .catch(err => {
        alert(err, 'GET_TASKS')
      })
  },
  [T.GET_TASK] ({ commit }, id) {
    Amplify.API.get('sls-api', `/task/${id}`)
      .then(res => {
        commit(T.GET_TASK, res)
      })
      .catch(err => {
        alert(err, 'GET_TASK')
      })
  },
  [T.ADD_TASK] ({ commit }, task) {
    Amplify.API.post('sls-api', '/task', task)
      .then(res => {
        commit(T.ADD_TASK, res)
      })
      .catch(err => {
        alert(err, 'ADD_TASK')
      })
  },
  [T.UPDATE_TASK] ({ commit }, params) {
    Amplify.API.put('sls-api', `/task/${params.id}`, { body: params.item })
      .then(res => {
        commit(T.UPDATE_TASK, res)
      })
      .catch(err => {
        alert(err, 'UPDATE_TASK')
      })
  },
  [T.DELETE_TASK] ({ commit }, id) {
    Amplify.API.del('sls-api', `/task/${id}`)
      .then(res => {
        commit(T.DELETE_TASK)
      })
      .catch(err => {
        alert(err, 'DELETE_TASK')
      })
  },
  [T.MOVE_TASK] ({ commit }, params) {
    Amplify.API.put('sls-api', `/move/${params.id}`, { body: params.toList })
      .catch(err => {
        alert(err, 'MOVE_TASK')
      })
  }
}
