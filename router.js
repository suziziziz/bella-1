import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/home'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/quem-somos',
        component: Home
      },
      {
        path: '/modelos/:gender',
        component: Home
      },
      {
        path: '/contato',
        component: Home
      },
      {
        path: '/quero-ser-modelo',
        component: Home
      },
      {
        path: '/blog',
        component: Home
      }
    ]
  })
}
