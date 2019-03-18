import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Vuelidate from 'vuelidate'
import 'nprogress/nprogress.css'
import DateFilter from '@/filters/date'

Vue.filter('date', DateFilter)
Vue.use(Vuelidate)

Vue.config.productionTip = false
const requireComponent = require.context(
  './components', // The relative path of the directory to search
  false, // subdirectories will not be searched
  /Base[A-Z]\w+\.(vue|js)$/ // Regular expresión that searches for components starting with "Base" and ending with .vue or .js
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1') // removes what's before and after the filename itself
    )
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
