<template lang="pug">
  div#app
    global-header(v-if="$route.path !== '/signin'")
    transition(name="fade", mode="out-in")
      router-view
</template>

<script>
import PageTop from './components/pages/PageTop.vue'
import GlobalHeader from './components/GlobalHeader.vue'

export default {
  name: 'App',
  components: {
    PageTop,
    GlobalHeader
  }
}
</script>

<style lang="scss">
html, body{
  margin: 0;
  padding: 0;
  background-color: #F7F7F7;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
