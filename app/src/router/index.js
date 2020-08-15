import Vue from 'vue'
import routes from './routers'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css' 


import { setTitle } from '../utils/util'

Vue.use(VueRouter)


NProgress.inc(0.4)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(to => {
  NProgress.done();
  setTitle(to, router.app)
  window.scrollTo(0, 0)
})

export default router
