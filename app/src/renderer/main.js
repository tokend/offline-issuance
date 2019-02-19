require('bootstrap-sass')
import './assets/styles/app.scss'
import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './App'
import routes from './routes'
import Auth from './auth'
import store from './vuex/store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(Auth)
Vue.use(VueMaterial)

Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthorized = store.getters.isAuthorized
  let isAuthanticationRequired = to.meta.authRequired

  if (!isAuthorized && isAuthanticationRequired) {
    next('/')
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  ...App
}).$mount('#app')
