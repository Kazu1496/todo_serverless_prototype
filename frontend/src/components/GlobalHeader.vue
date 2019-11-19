<template lang="pug">
  header
    router-link(:to="{ name: 'home' }")
      h1 Todo Serverless App
    .right_area(v-if="user")
      p {{ user.username }}
      button(@click="signOut") ログアウト
</template>

<script>
import { mapGetters } from 'vuex'
import { Auth } from 'aws-amplify'
import { T } from '../store/task/types'

export default {
  name: 'GlobalHeader',
  computed: {
    ...mapGetters('user', {
      user: 'getUser'
    })
  },
  methods: {
    signOut: function () {
      Auth.signOut()
        .then(_ => {
          this.$store.commit(`task/${T.INIT_TASKS}`)
          this.$router.push('/signin')
        })
        .catch(e => {
          alert(e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/Header.scss';
</style>
