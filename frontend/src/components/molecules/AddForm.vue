<template lang="pug">
  form(@submit.prevent="addItem")
    input(type="text", v-model="title", placeholder="Title")
    .score_area
      span Priority:{{ priority }}
      star-rating(:star-size="20", :show-rating="false", active-color="#FFA726", v-model="priority")
    textarea(placeholder="Description", v-model="description")
    input(type="submit", value="Add")
</template>

<script>
import { T } from '../../store/task/types'

export default {
  name: 'AddForm',
  props: {
    label: {
      type: String,
      require: true,
      default: ''
    }
  },
  data () {
    return {
      title: '',
      description: '',
      priority: 1
    }
  },
  methods: {
    addItem () {
      if (this.title === '') {
        alert('値を入力してください。')
        return
      }
      const item = {
        priority: this.priority,
        title: this.title,
        description: this.description,
        list: this.$props.label
      }
      this.$store.dispatch(`task/${T.ADD_TASK}`, { body: item })
      this.title = ''
      this.description = ''
      this.score = 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/molecules/Form.scss';
</style>
