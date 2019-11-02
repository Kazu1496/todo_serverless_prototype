<template lang="pug">
  transition(name="modal")
    .modal-wrapper
      .modal-container
        button(@click="$emit('close')")
          font-awesome-icon(icon="times", size="2x")
        h2 Edit Todo!
        edit-form(:todo="todo")
</template>

<script>
import EditForm from '../molecules/EditForm.vue'

export default {
  name: 'EditItemModal',
  components: {
    EditForm
  },
  props: {
    todo: {
      type: Object,
      require: true,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/Modal.scss';
</style>
