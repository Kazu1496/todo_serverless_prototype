import { T } from './types'

export const mutations = {
  [T.SET_USER] (state, user) {
    state.user = user
  }
}
