<template lang="pug">
  .show_item-container
    .item_header
      h1.title {{ todo.title }}
    .status_area
      p.area_title Status
      p {{ todo.label }}
    .priority_area
      p.area_title Priority
      font-awesome-icon(icon="star", v-for="n in todo.score")
    .description_area
      p.area_title Description
      vue-markdown(
        :source="todo.description? todo.description : '説明文がありません。' "
        class="markdown-body"
      )
    .link_area
      router-link(:to="{ name: 'home' }") Back
      a(@click="showModal = true") Edit
      a(@click="deleteItem") Delete
    edit-item-modal(v-show="showModal", @close="showModal = false", :todo="todo")
</template>

<script>
import EditItemModal from '../modal/EditItemModal.vue'
import VueMarkdown from 'vue-markdown'
import { T } from '../../store/todo/types'
import { mapGetters } from 'vuex'

export default {
  name: 'PageShowItem',
  components: {
    EditItemModal,
    VueMarkdown
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapGetters('todo', {
      todo: 'getTodo'
    })
  },
  mounted () {
    this.$store.dispatch(`todo/${T.GET_TODO}`, this.$route.params.card_id)
  },
  methods: {
    deleteItem () {
      if (!confirm('削除しても大丈夫ですか？')) {
        return
      }
      this.$store.dispatch(`todo/${T.DELETE_TODO}`, this.$route.params.card_id)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/pages/PageShowItem.scss';
</style>
