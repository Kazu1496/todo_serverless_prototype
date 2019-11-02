<template lang="pug">
  .signin_container
    h1 Sign in
    button(@click="googleLogin") Googleでログイン
    p または
    form(@submit.prevent="signIn")
      input(type="text" placeholder="Email" v-model="email")
      input(type="password" placeholder="Password" v-model="password")
      input(type="submit", value="ログイン")
    p アカウントをお持ちでない方はこちら
    router-link(:to="{ name: 'signup' }") ユーザー登録する
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'PageLogin',
  data () {
    return {
      email: '',
      password: '',
      isAuth: false
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
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push('/')
        })
        .catch(_ => {
          alert('ログインできませんでした。ユーザー名またはメールアドレスを確認してください。')
        })
    },
    googleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(_ => {
          alert('ログインしました')
          this.$router.push('/')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/pages/PageSign.scss';
</style>
