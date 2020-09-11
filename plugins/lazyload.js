/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

import error from '../assets/img/edutore.png'
import loading from '../assets/img/edutore.png'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error,
  loading,
  attempt: 1
})
