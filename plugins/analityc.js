import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-135612854-1',
  autoTracking: {
    screenview: true
  }
})
