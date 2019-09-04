import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/home'
import About from '~/pages/about'
import Talents from '~/pages/talents'
import TalentsList from '~/components/TalentsList.vue'
import TalentGallery from '~/pages/talentGallery.vue'
import Contact from '~/pages/contact'
import GetScouted from '~/pages/getScouted'
import Blog from '~/pages/blog'
import BlogPost from '~/pages/BlogPost'

Vue.use(Router)

export function createRouter () {
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
        path: '/modelo/:id/:name',
        component: TalentGallery
      },
      {
        path: '/contato',
        component: Contact
      },
      {
        path: '/quero-ser-modelo',
        component: GetScouted
      },
      {
        path: '/blog',
        component: Blog
      },
      {
        path: '/blog/:post_name/:post_id',
        component: BlogPost
      }
    ]
  })
}
