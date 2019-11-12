<template lang="pug">
  .show_item-container
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
    edit-item-modal(v-show="showModal", @close="showModal = false", :task="targetTask")
</template>

<script>
import EditItemModal from '../modal/EditItemModal.vue'
import VueMarkdown from 'vue-markdown'
import { T } from '../../store/task/types'
import { mapGetters } from 'vuex'

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
      handler: function (newVal, oldValue) {
        if (newVal !== oldValue) {
          this.targetTask = clonedeep(newVal)
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.$store.dispatch(`task/${T.GET_TASK}`, this.$route.params.task_id)
  },
  methods: {
    deleteItem () {
      if (!confirm('削除しても大丈夫ですか？')) {
        return
      }
      this.$store.dispatch(`task/${T.DELETE_TASK}`, this.$route.params.task_id)
      this.$nextTick(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/pages/PageShowItem.scss';
</style>
