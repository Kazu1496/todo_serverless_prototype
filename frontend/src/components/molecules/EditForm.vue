<template lang="pug">
  form(@submit.prevent="updateItem")
    input(type="text", v-model="task.attributes.title", placeholder="Title")
    .score_area
      span Priority:{{ task.attributes.priority }}
      star-rating(:star-size="20", :show-rating="false", active-color="#FFA726", v-model="task.attributes.priority")
    textarea(placeholder="Description", v-model="task.attributes.description")
    input(type="submit", value="Update")
</template>

<script>
import { T } from '../../store/task/types'
import { TaskListEnum } from '../../types/index'
import { mapActions } from 'vuex'

export default {
  name: 'EditForm',
  props: {
    task: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data () {
    return {
      options: Object.keys(TaskListEnum)
    }
  },
  methods: {
    ...mapActions({
      updateTask: `task/${T.UPDATE_TASK}`
    }),
    updateItem () {
      if (this.task.attributes.title === '') {
        alert('値を入力してください。')
        return
      }
      const params = {
        id: this.$route.params.task_id,
        item: {
          priority: this.task.attributes.priority,
          title: this.task.attributes.title,
          description: this.task.attributes.description,
          list: this.task.attributes.list
        }
      }
      this.updateTask(params)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/molecules/Form.scss';
</style>
