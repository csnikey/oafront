import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui' // element-ui
import VueProgressBar from 'vue-progressbar' // progress bar
import { fetch } from '@/util' // http fetch function
import 'normalize.css'
import '@/styles/layout.scss'
import 'element-ui/lib/theme-default/index.css'

const __Prototype = Vue.prototype

Vue.use(ElementUI)
Vue.use(VueProgressBar, {
  color: '#20dab2',
  failedColor: '#FF4949',
  thickness: '3px',
  transition: {
    speed: '0.3s',
    opacity: '0.5s',
    termination: 500
  },
  autoRevert: true,
  location: 'top',
  inverse: false	
})

router.beforeEach((to, from, next) => {
  // console.log(to);
  let lev1=to.path.split('/');
  // store.dispatch('getMenus',lev1)
  if (to.meta.progress !== undefined) {
    let meta = to.meta.progress
    // parse meta tags
    __Prototype.$Progress.parseMeta(meta)
  }
  // start the progress bar
  __Prototype.$Progress.parseMeta({
  	func: [
  		{ call: 'color', modifier: 'temp', argument: '#2ea1f7' }
  	]
  })
  __Prototype.$Progress.start()
  store.commit('routeNavigate', to.matched)
  // continue to next page
  next()
})

router.afterEach((to, from) => {
  // finish the progress bar
  __Prototype.$Progress.finish()
})

__Prototype.$fetch = fetch

/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
