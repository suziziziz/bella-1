<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        bella_models_nuxt
      </h1>

      <h2 class="subtitle">
        Criada em 2006 e com duas sedes no Rio de Janeiro, a Bella Models é uma
        das mais fortes agências do Rio de Janeiro, prestando um serviço
        diferenciado no mercado fashion, comercial e plus size.
      </h2>

      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green"
          >Documentation</a
        >
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
          >GitHub</a
        >
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },

  data() {
    return {
      // meta: {
      //   title: 'Bella #Models',
      //   description:
      //     'Criada em 2006 e com duas sedes no Rio de Janeiro, a Bella Models é uma das mais fortes agências do Rio de Janeiro, prestando um serviço diferenciado no mercado fashion, comercial e plus size.',
      //   keywords:
      //     'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos',
      //   logo: 'http://managerfashion.com/assets/clients_logos/bella_models.png',
      //   url: window.location.href
      // }
    }
  }

  // head() {
  //   return {
  //     title: this.meta.title,
  //     meta: [
  //       { name: 'keywords', content: this.meta.keywords },
  //       { name: 'twitter:description', content: this.meta.description },
  //       { name: 'twitter:app:name:iphone', content: this.meta.title },
  //       { name: 'twitter:app:url:iphone', content: this.meta.url },

  //       { property: 'twitter:title', content: this.meta.title },
  //       { property: 'og:title', content: this.meta.title },
  //       { property: 'og:url', content: this.meta.url },
  //       { property: 'og:description', content: this.meta.description },
  //       { property: 'og:site_name', content: this.meta.title },
  //       { property: 'al:ios:app_name', content: this.meta.title },
  //       { property: 'al:android:app_name', content: this.meta.title },
  //       { property: 'al:ios:url', content: this.meta.url },
  //       { property: 'al:android:url', content: this.meta.url },
  //       { property: 'al:web:url', content: this.meta.url },

  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content: this.meta.description
  //       }
  //     ]
  //   }
  // }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
