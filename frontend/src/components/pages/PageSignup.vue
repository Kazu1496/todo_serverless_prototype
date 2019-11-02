<template lang="pug">
  .signup_container
    h1 Sign up
    form(@submit.prevent="signUp")
      input(type="text" placeholder="Email" v-model="email")
      input(type="password" placeholder="Password" v-model="password")
      input(type="submit" value="会員登録")
    router-link(:to="{ name: 'signin' }") ログインページに戻る
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'PageLogin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/')
      }
    })
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push('/')
        })
        .catch(_ => {
          alert('アカウントが作成できませんでした。')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/pages/PageSign.scss';
</style>
