<template lang="pug">
  .todo
    .list-container
      task-list(v-for="(tasks, key) in taskList" :tasks="tasks" :label="key" @show="onShowModal" @purge="onPurgeTasks")
    add-item-modal(v-show="showModal", @close="showModal = false" :label="addToList")
</template>

<script>
import AddForm from '../molecules/AddForm.vue'
import TaskList from '../organisms/TaskList.vue'
import AddItemModal from '../modal/AddItemModal.vue'
import { T } from '../../store/task/types'
import { mapGetters } from 'vuex'

export default {
  name: 'PageTop',
  components: {
    AddForm,
    TaskList,
    AddItemModal
  },
  data: () => {
    return {
      showModal: false,
      addToList: ''
    }
  },
  computed: {
    ...mapGetters('task', {
      taskList: 'getTasks'
    })
  },
  mounted () {
    this.$store.dispatch(`task/${T.GET_TASKS}`)
  },
  methods: {
    onShowModal: function (label) {
      this.addToList = label
      this.showModal = true
    },
    onPurgeTasks: function () {
      const taskIds = this.taskList.DONE.map(task => task.groupId)
      this.$store.dispatch(`task/${T.PURGE_TASKS}`, taskIds)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/stylesheets/pages/PageTop.scss';
</style>
