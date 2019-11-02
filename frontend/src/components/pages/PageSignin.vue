<template lang="pug">
  .signin_container
    amplify-authenticator(:auth-config="authConfig")
</template>

<script>
export default {
  name: 'PageLogin',
  data () {
    return {
      authConfig: {
        signInConfig: {
          header: 'Sign in'
        },
        signUpConfig: {
          hideDefaults: true,
          signUpFields: [
            { label: 'username', key: 'username', required: true, type: 'text', displayOrder: 0 },
            { label: 'Email', key: 'email', required: true, type: 'email', displayOrder: 1 },
            { label: 'Password', key: 'password', required: true, type: 'text', displayOrder: 2 }
          ]
        },
        confirmSignUpConfig: {},
        forgotPasswordConfig: {},
        confirmSignInConfig: {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/pages/PageSign.scss';
</style>
