<template lang="pug">
  ul(v-if="sortedTasks.length")
    p.label {{ label }}
    .list_item-container
      task-item(
        v-for="task in sortedTasks"
        :task="task"
      )
  ul(v-else)
    p.label {{ label }}
    p.message Nothing Todo
</template>

<script>
import TaskItem from '../molecules/TaskItem.vue'

export default {
  name: 'TaskList',
  components: {
    TaskItem
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
      sortedTasks: []
    }
  },
  mounted () {
    const _taskList = this.$props.tasks
    this.sortedTasks = _taskList.sort((a, b) => {
      if (a.attributes.priority > b.attributes.priority) return -1
      if (a.attributes.priority < b.attributes.priority) return 1
      return 0
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/organisms/TodoList.scss';
</style>
