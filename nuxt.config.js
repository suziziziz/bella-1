/**
 * Meta configs. Update these if you're starting a new project
 */
import meta from './meta'

export default {
  mode: 'universal',

  /*
  .** Headers of the page
  */
  head: {
    title: meta.title,

    meta: [
      { charset: 'utf-8' },

      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'theme-color', content: '#1F1A17' },
      { name: 'keywords', content: meta.keywords },
      { name: 'twitter:description', content: meta.description },
      { name: 'twitter:image:src', content: meta.logo },
      { name: 'twitter:card', content: meta.logo },
      { name: 'twitter:app:name:iphone', content: meta.title },
      { name: 'twitter:app:url:iphone', content: meta.url },

      { property: 'twitter:title', content: meta.title },
      { property: 'og:image', content: meta.logo },
      { property: 'og:title', content: meta.title },
      { property: 'og:url', content: meta.url },
      { property: 'og:description', content: meta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: meta.title },
      { property: 'al:ios:app_name', content: meta.title },
      { property: 'al:android:app_name', content: meta.title },
      { property: 'al:ios:url', content: meta.url },
      { property: 'al:android:url', content: meta.url },
      { property: 'al:web:url', content: meta.url },

      { hid: 'description', name: 'description', content: meta.description }
    ],

    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/android-chrome-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/android-chrome-512x512.png'
      },
      {
        rel: 'shortcut icon',
        href: '/shortcut.png'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
        integrity:
          'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        integrity:
          'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T',
        crossorigin: 'anonymous'
      }
    ],
    script: [
      {
        src:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyDfgkdEf62kbP8m-aUXqx1fujhyRi_GpnY'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#1F1A17' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/global.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/install-notify', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/vue-i18n' },
    { src: '~/plugins/lodash' },
    { src: '~/plugins/vue-lazyload' },
    { src: '~/plugins/vuesax' },
    { src: '~/plugins/vee-validate', ssr: false }
  ],

  router: {
    middleware: 'signin'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['@nuxtjs/router', { keepDefaultRouter: true }]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
