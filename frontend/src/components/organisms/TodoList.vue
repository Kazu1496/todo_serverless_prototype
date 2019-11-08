<template lang="pug">
  ul(v-if="localTodos.length")
    p.label {{ label }}
    .list_item-container
      todo-item(
        v-for="todo in localTodos"
        :todo="todo"
      )
  ul(v-else)
    p.label {{ label }}
    p.message Nothing Todo
</template>

<script>
import TodoItem from '../molecules/TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    tasks: {
      type: Array,
      require: true,
      default: () => ([])
    },
    label: {
      type: String,
      require: true,
      default: () => ({})
    }
  },
  data: () => {
    return {
      localTodos: []
    }
  },
  mounted () {
    const _todoList = this.$props.todos
    this.localTodos = _todoList.sort((a, b) => {
      if (a.score > b.score) return -1
      if (a.score < b.score) return 1
      return 0
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/organisms/TodoList.scss';
</style>
