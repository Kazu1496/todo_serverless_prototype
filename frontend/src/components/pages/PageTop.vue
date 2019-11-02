<template lang="pug">
  .todo
    .button_area
      button(@click="showModal = true") Add Todo
      button(@click="purgeItem") Purge
    .list-container
      todo-list(v-for="todoList in todoLists", :todos="todoList.todos", :label="todoList.label")
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
      showModal: false
    }
  },
  computed: {
    ...mapGetters('todo', {
      todoLists: 'getTodolists',
      labels: 'getLables'
    })
  },
  mounted () {
    this.$store.dispatch(`todo/${T.GET_LABELS}`)
    this.$store.dispatch(`todo/${T.GET_TODOLISTS}`)
  },
  methods: {
    purgeItem () {
      if (!confirm('一括削除しても大丈夫ですか？')) {
        return
      }
      this.$store.dispatch(`todo/${T.PURGE_TODO}`, this.todoLists)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/stylesheets/pages/PageTop.scss';
</style>
