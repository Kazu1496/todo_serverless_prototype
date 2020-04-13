<template lang="pug">
  router-link(:to="{ name: 'show-item', params: { task_id: task.groupId } }" :data-task-id="task.groupId")
    li
      .task_elements
        span.title {{ task.attributes.title }}
        .priority_area
          font-awesome-icon(icon="star", v-for="n in task.attributes.priority" :key="n")
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      require: true,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/molecules/TaskItem.scss';
</style>
