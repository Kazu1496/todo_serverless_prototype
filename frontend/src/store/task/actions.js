import { T } from './types'
import Amplify from 'aws-amplify'

export const actions = {
  [T.GET_TASKS] ({ commit }) {
    Amplify.API.get('sls-api', '/tasks')
      .then(res => {
        commit(T.GET_TASKS, res)
      })
      .catch(err => {
        alert(err)
      })
  },
  [T.GET_TASK] ({ commit }, id) {
    Amplify.API.get('sls-api', `/task/${id}`)
      .then(res => {
        commit(T.GET_TASK, res)
      })
      .catch(err => {
        alert(err)
      })
  },
  [T.ADD_TASK] ({ commit }, task) {
    Amplify.API.post('sls-api', '/task', task)
      .then(res => {
        commit(T.ADD_TASK, res)
      })
      .catch(err => {
        alert(err)
      })
  },
  [T.UPDATE_TASK] ({ commit }, params) {
    Amplify.API.put('sls-api', `/task/${params.id}`, { body: params.item })
      .then(res => {
        commit(T.UPDATE_TASK, res)
      })
      .catch(err => {
        alert(err)
      })
  },
  [T.DELETE_TASK] ({ commit }, id) {
    Amplify.API.del('sls-api', `/task/${id}`)
      .then(res => {
        commit(T.DELETE_TASK)
      })
      .catch(err => {
        alert(err)
      })
  }
}
