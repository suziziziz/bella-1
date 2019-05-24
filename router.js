import Vue from 'vue'
import Router from 'vue-router'

import Index from '~/pages/index'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [
      {
        path: '/',
        component: Index
      },
      {
        path: '/quem-somos',
        component: Index
      },
      {
        path: '/modelos/:gender',
        component: Index
      },
      {
        path: '/contato',
        component: Index
      },
      {
        path: '/quero-ser-modelo',
        component: Index
      },
      {
        path: '/blog',
        component: Index
      }
    ]
  })
}
