<template lang="pug">
  .todo
    .button_area
      button(@click="showModal = true") Add Todo
    .list-container
      p {{ tasklist }}
      template(v-if="tasks")
        todo-list(v-for="tasks in tasks" :tasks="tasks" :label="Current")
      template(v-else)
        p なにもないよ
    add-item-modal(v-show="showModal", @close="showModal = false")
</template>

<script>
import AddForm from '../molecules/AddForm.vue'
import TodoList from '../organisms/TodoList.vue'
import AddItemModal from '../modal/AddItemModal.vue'
import { T } from '../../store/todo/types'
import { mapGetters } from 'vuex'

export default {
  name: 'PageTop',
  components: {
    AddForm,
    TodoList,
    AddItemModal
  },
  data: () => {
    return {
      newItem: '',
      showModal: false,
      hello: '',
      tasklist: []
    }
  },
  computed: {
    ...mapGetters('todo', {
      tasks: 'getTasks'
    })
  },
  async mounted () {
    const user = await this.$Amplify.Auth.currentSession()
    this.$store.dispatch(`todo/${T.GET_TASKS}`)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/stylesheets/pages/PageTop.scss';
</style>
