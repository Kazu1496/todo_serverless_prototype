<template lang="pug">
  ul(v-if="sortedTasks.length")
    .list_header
      p.label {{ label | formatListName }}
      button(v-if="label !== 'DONE'" @click="$emit('show', label)")
        font-awesome-icon(icon="plus")
    .list_item-container
      task-item(
        v-for="(task, index) in sortedTasks"
        :task="task"
        :key="index"
      )
  ul(v-else)
    p.label {{ label | formatListName }}
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
  computed: {
    sortedTasks: function () {
      const _taskList = this.$props.tasks
      return _taskList.sort((a, b) => {
        if (a.attributes.priority > b.attributes.priority) return -1
        if (a.attributes.priority < b.attributes.priority) return 1
        return 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/organisms/TaskList.scss';
</style>
