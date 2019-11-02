<template lang="pug">
  header
    router-link(:to="{ name: 'home' }")
      h1 Todo Serverless App
    .right_area(v-if="user")
      <amplify-sign-out />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GlobalHeader',
  computed: {
    ...mapGetters('user', {
      user: 'getUser'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/Header.scss';
</style>
