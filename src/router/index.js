import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.meta.login && store().state.member.id === '') {
      next('/Login')
    } else {
      if (to.meta.right && !store().state.member.right) {
        next(false)
      } else {
        next()
      }
    }
  })

  Router.afterEach((to, from) => {
    let title = ''
    if (to.name === 'Member') {
      title = store().state.member.name + ' 的會員中心'
    } else if (to.name === 'D_Cart') {
      title = store().state.member.name + ' 的捐贈籃'
    } else if (to.name === 'S_Cart') {
      title = store().state.member.name + ' 的需求籃'
    } else {
      title = to.meta.title
    }
    document.title = title
  })
  return Router
}
