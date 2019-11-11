import Vue from 'vue'
import store from './store/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { StarRating } from 'vue-rate-it'
import App from './App.vue'
import router from './router'

// aws-amplify registering
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)
Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'sls-api',
        endpoint: process.env.VUE_APP_API_URL_BASE
      }
    ]
  }
})
Vue.use(AmplifyPlugin, AmplifyModules)

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('star-rating', StarRating)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
