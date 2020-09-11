import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import id from 'vee-validate/dist/locale/id.json'

// extend('required', {
//   ...required,
//   // message: 'This field is required'
// });

// install rules and localization
Object.keys(rules).forEach((rule) => {
  // eslint-disable-next-line import/namespace
  extend(rule, rules[rule])
})

localize('id', id)

extend('pos', (value) => {
  // return value >= 0;
  return 'some error'
})
// Register it globally
// main.js or any entry file.
Vue.component('ValidationProvider', ValidationProvider)
// Install components globally
Vue.component('ValidationObserver', ValidationObserver)
// Vue.config.productionTip = false;
