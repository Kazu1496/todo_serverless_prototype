<template lang="pug">
  header
    router-link(:to="{ name: 'home' }")
      h1 俺の考えた最強のTODOリスト
    .right_area(v-if="showButton")
      a(@click="signOut") ログアウト
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'GlobalHeader',
  data () {
    return {
      user: '',
      userImage: '@/assets/img/no_image.png',
      showButton: false
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
        this.showButton = true
      }
    })
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut()
        .then(() => {
          this.showButton = false
          this.$router.push('/signin')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/Header.scss';
</style>
