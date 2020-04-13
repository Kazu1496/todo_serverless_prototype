import { T } from './types'
import Amplify from 'aws-amplify'

export const actions = {
  [T.GET_TASKS] ({ commit }) {
    Amplify.API.get('sls-api', '/tasks')
      .then(res => {
        commit(T.GET_TASKS, res)
      })
  },
  [T.GET_TASK] ({ commit }, id) {
    Amplify.API.get('sls-api', `/task/${id}`)
      .then(res => {
        if (!Object.keys(res).includes('error')) {
          commit(T.GET_TASK, res)
        } else {
          alert(res.error)
        }
      })
  },
  [T.ADD_TASK] ({ commit }, task) {
    Amplify.API.post('sls-api', '/task', task)
      .then(res => {
        commit(T.ADD_TASK, res)
      })
  },
  [T.UPDATE_TASK] ({ commit }, params) {
    Amplify.API.put('sls-api', `/task/${params.id}`, { body: params.item })
      .then(res => {
        commit(T.UPDATE_TASK, res)
      })
  },
  [T.DELETE_TASK] ({ commit }, id) {
    Amplify.API.del('sls-api', `/task/${id}`)
      .then(_ => {
        commit(T.DELETE_TASK)
      })
  },
  [T.MOVE_TASK] ({ commit }, params) {
    Amplify.API.put('sls-api', `/move/${params.id}`, { body: params.toList })
      .then(res => {
        commit(T.UPDATE_TASK, res)
      })
  },
  [T.PURGE_TASKS] ({ commit }, taskIds) {
    Amplify.API.del('sls-api', `/tasks/purge`, { body: taskIds })
      .then(_ => {
        commit(T.PURGE_TASKS, taskIds)
      })
  }
}
