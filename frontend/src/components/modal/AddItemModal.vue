<template lang="pug">
  transition(name="modal")
    .modal-wrapper
      .modal-container
        button(@click="$emit('close')")
          font-awesome-icon(icon="times", size="2x")
        h2 Add to the TodoList!
        add-form
</template>

<script>
import AddForm from '../molecules/AddForm.vue'

export default {
  name: 'AddItemModal',
  components: {
    AddForm
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/Modal.scss';
</style>
