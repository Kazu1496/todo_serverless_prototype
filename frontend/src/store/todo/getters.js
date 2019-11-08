export const getters = {
  getTasks (state) {
    return state.todoLists
  },
  getTask (state) {
    return state.todo
  }
}
