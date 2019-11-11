<template lang="pug">
  .todo
    .button_area
      button(@click="showModal = true") Add Todo
    .list-container
      task-list(v-for="(tasks, key) in taskList" :tasks="tasks" :label="key")
    add-item-modal(v-show="showModal", @close="showModal = false")
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
      showModal: false
    }
  },
  computed: {
    ...mapGetters('task', {
      taskList: 'getTasks'
    })
  },
  mounted () {
    this.$store.dispatch(`task/${T.GET_TASKS}`)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/stylesheets/pages/PageTop.scss';
</style>
