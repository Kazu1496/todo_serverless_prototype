<template lang="pug">
  .list_container
    .list_header
      p.label {{ label | formatListName }}
      button(v-if="label !== 'DONE'" @click="$emit('show', label)")
        font-awesome-icon(icon="plus")
      button.purge(v-else @click="purgeTasks") Purge
    draggable(
      v-if="sortedTasks.length"
      tag="ul" group="TASKS"
      @end="dragEnd"
      :data-label="label"
      :animation="200"
      )
      task-item(
        v-for="(task, index) in sortedTasks"
        :task="task"
        :key="index"
      )
    draggable(v-else tag="ul" group="TASKS" @end="dragEnd" :data-label="label")
</template>

<script>
import TaskItem from '../molecules/TaskItem.vue'
import draggable from 'vuedraggable'
import { T } from '../../store/task/types'
import { mapActions } from 'vuex'

export default {
  name: 'TaskList',
  components: {
    TaskItem,
    draggable
  },
  props: {
    tasks: {
      type: Array,
      require: true,
      default: () => []
    },
    label: {
      type: String,
      require: true,
      default: () => {}
    }
  },
  computed: {
    sortedTasks () {
      const _taskList = this.$props.tasks
      return _taskList.sort((a, b) => {
        if (a.attributes.priority > b.attributes.priority) return -1
        if (a.attributes.priority < b.attributes.priority) return 1
        return 0
      })
    }
  },
  methods: {
    ...mapActions({
      moveTask: `task/${T.MOVE_TASK}`
    }),
    dragEnd (event) {
      this.moveTask({
        id: event.item.dataset.taskId,
        toList: event.to.dataset.label
      })
    },
    purgeTasks () {
      if (!confirm('アーカイブしてもよろしいですか？')) {
        return
      }
      this.$emit('purge')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/organisms/TaskList.scss';
</style>
