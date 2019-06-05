import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/home'
import About from '~/pages/about'
import Talents from '~/pages/talents'
import TalentsList from '~/components/TalentsList.vue'

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
        component: About
      },
      {
        path: '/modelos',
        component: Talents,
        children: [
          {
            path: ':gender',
            component: TalentsList
          }
        ]
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
