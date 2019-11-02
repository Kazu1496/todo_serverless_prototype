<template lang="pug">
  router-link(:to="{ name: 'show-item', params: { card_id: todo.id } }")
    li
      .todo_elements
        span.title(:class="{ done: todo.status }") {{ todo.title }}
        .priority_area
          font-awesome-icon(icon="star", v-for="n in todo.score")
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      require: true,
      default: () => ({})
    }
  },
  data () {
    return {
      options: ['Todo', 'Doing', 'Done']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/molecules/TodoItem.scss';
</style>
