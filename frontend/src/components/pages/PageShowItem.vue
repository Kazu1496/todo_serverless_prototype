<template lang="pug">
  .show_item-container(v-if="Object.keys(task).length")
    .item_header
      h1.title {{ task.attributes.title }}
    .status_area
      p.area_title Status
      p {{ task.attributes.list | formatListName }}
    .priority_area
      p.area_title Priority
      font-awesome-icon(icon="star", v-for="n in task.attributes.priority" :key="n")
    .description_area
      p.area_title Description
      vue-markdown(
        :source="task.attributes.description"
        class="markdown-body"
      )
    .link_area
      router-link(:to="{ name: 'home' }") Back
      a(@click="showModal = true") Edit
      a(@click="deleteItem") Delete
    edit-item-modal(
      v-show="showModal"
      @close="showModal = false"
      :task="targetTask"
      )
</template>

<script>
import EditItemModal from '../modal/EditItemModal.vue'
import VueMarkdown from 'vue-markdown'
import { T } from '../../store/task/types'
import { mapGetters, mapActions } from 'vuex'

const clonedeep = require('lodash/cloneDeep')

export default {
  name: 'PageShowItem',
  components: {
    EditItemModal,
    VueMarkdown
  },
  data () {
    return {
      showModal: false,
      targetTask: {}
    }
  },
  computed: {
    ...mapGetters('task', {
      task: 'getTask'
    })
  },
  watch: {
    task: {
      handler (newVal, oldValue) {
        if (newVal !== oldValue) {
          this.targetTask = clonedeep(newVal)
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.getTask(this.$route.params.task_id)
  },
  methods: {
    ...mapActions({
      getTask: `task/${T.GET_TASK}`,
      deleteTask: `task/${T.DELETE_TASK}`
    }),
    deleteItem () {
      if (!confirm('削除しても大丈夫ですか？')) {
        return
      }
      this.deleteTask(this.$route.params.task_id)
      this.$routes.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/pages/PageShowItem.scss';
</style>
